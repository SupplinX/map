import { GoogleMap, Marker, Polygon, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { FC, useCallback, useState } from 'react';
import { CurveMarker, kurwaNaMapie } from '../../components/curve_line';
import CustomMarker from '../../components/marker/marker';
import { useQuery } from 'react-query'
import axios from 'axios'
import { ICompany, IConnection } from '../../types/company';
import { CustomPolyline } from './components/polyline';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 50.117052, lng: 18.703157
};

interface IProps {
    setCompanyInfoVisible: () => void;
    setActiveMarker: (id: number) => void;
    activeMarker: number | null;
    selectedCompany: ICompany | undefined;
    industries: number[];
    products: number[];
    needs: number[];
}

export const MapView: FC<IProps> = ({ setCompanyInfoVisible, setActiveMarker, activeMarker, selectedCompany, industries, products, needs }) => {
    const { isLoading, error, data } = useQuery<ICompany[]>({
        queryKey: ['companies', industries, products, needs],
        queryFn: async () => {
            let url = `/supplinx/fill-map`
            let query: string[] = [];
            if (industries.length > 0) query.push('industries=' + industries.join(','))
            if (products.length > 0) query.push('products=' + products.join(','))
            if (needs.length > 0) query.push('needs=' + needs.join(','))
            if (query.length > 0) {
                url += '?' + query.join('&')
            }
            console.log(url)
            const { data } = await axios.get(url)
            return data
        }
    })
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAu8GpDD32d_lLAtHP_tZyWhkbAzXRIy9E",
        mapIds: ['b32819489bc5a143'],
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [projection, setProjection] = useState<google.maps.Projection | undefined>(undefined)
    const [zoomListener, setZoomListener] = useState<number>(6)

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(map)
        map.addListener('projection_changed', () => {
            setProjection(map.getProjection())
        });
        map.addListener('zoom_changed', () => {
            const zoom = map.getZoom()
            if (zoom !== undefined) {
                setZoomListener(zoom)
            }
        });
    }, [])

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    if (!isLoaded) return null

    return (
        <div className="w-full h-screen relative z-10">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoomListener}
                id="b32819489bc5a143"
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    minZoom: 1,
                    mapId: 'b32819489bc5a143',
                    zoom: 6,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoomControl: false,
                    clickableIcons: false,
                }}
                onRightClick={() => setCompanyInfoVisible()}
            // onClick={() => setCompanyInfoVisible(false)}
            >
                {
                    activeMarker === null && data?.map((company, index) => {
                        return <CustomMarker
                            key={index}
                            company={company}
                            map={map}
                            setActiveMarker={setActiveMarker}
                            active={activeMarker === company.id}
                        />
                    })
                }
                {
                    activeMarker !== null && selectedCompany && <>
                        <CustomMarker
                            company={selectedCompany}
                            map={map}
                            setActiveMarker={setActiveMarker}
                            active={activeMarker === selectedCompany.id}
                        />
                        {selectedCompany.mother_company && <CustomMarker
                            company={selectedCompany.mother_company}
                            map={map}
                            setActiveMarker={setActiveMarker}
                            active={false}
                            type="mother"
                        />}
                    </>
                }
                {
                    selectedCompany?.partners?.map((connection, index) => {
                        return <>
                            {(!selectedCompany.mother_company || selectedCompany.mother_company.id !== connection.partner.id) && <CustomMarker
                                key={index}
                                company={connection.partner}
                                map={map}
                                setActiveMarker={setActiveMarker}
                                active={false}
                                type={connection.type}
                            />}
                            <CustomPolyline path={[
                                { lat: parseFloat(connection.partner.lat), lng: parseFloat(connection.partner.lng) },
                                { lat: parseFloat(selectedCompany.lat), lng: parseFloat(selectedCompany.lng) },
                            ]} activeMarker={activeMarker} map={map} />
                        </>
                    })
                }
                {
                    selectedCompany?.child_companies?.map((company, index) => {
                        return <>
                            <CustomMarker
                                key={index}
                                company={company}
                                map={map}
                                setActiveMarker={setActiveMarker}
                                active={false}
                                type="child"
                            />
                        </>
                    })
                }
            </GoogleMap >
        </div>
    )
}