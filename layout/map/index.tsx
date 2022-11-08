import { GoogleMap, Marker, Polygon, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { FC, useCallback, useState } from 'react';
import { CurveMarker, kurwaNaMapie } from '../../components/curve_line';
import CustomMarker from '../../components/marker/marker';
import { useQuery } from 'react-query'
import axios from 'axios'
import { ICompany } from '../../types/company';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 50.117052, lng: 18.703157
};

interface IProps {
    setCompanyInfoVisible: (visible?: boolean) => void;
    setActiveMarker: (id: number) => void;
    activeMarker: number | null;
}

export const MapView: FC<IProps> = ({ setCompanyInfoVisible, setActiveMarker, activeMarker }) => {
    const { isLoading, error, data } = useQuery<ICompany[]>({
        queryKey: 'companies',
        queryFn: async () => {
            const { data } = await axios.get('/mapflow-companies/fill-map')
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
                    zoomControl: false
                }}
                onClick={() => setCompanyInfoVisible(false)}
            >
                {
                    data?.map((company, index) => {
                        return <CustomMarker
                            key={index}
                            company={company}
                            map={map}
                            setActiveMarker={setActiveMarker}
                            active={activeMarker === company.id}
                        />
                    })
                }
                {/* <Polyline path={[
                    { lat: 50.146231, lng: 38.689755 },
                    { lat: 51.346231, lng: 19.689755 },
                ]} options={{ geodesic: true, strokeWeight: 2, strokeColor: '#fff' }} /> */}
            </GoogleMap >
        </div>
    )
}