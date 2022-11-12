import { useJsApiLoader, GoogleMap } from "@react-google-maps/api"
import { useState, useCallback, FC } from "react"
import CustomMarker from "../../../components/marker/marker"
import { ICompany } from "../../../types/company";
import { CustomPolyline } from "./polyline"

interface IProps {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void;
    selectedCompany: ICompany | undefined;
    activeMarker: number | null;
    setActiveMarker: (id: number) => void;
    setCompanyInfoVisible: () => void;
    data: ICompany[] | undefined;
    center: google.maps.LatLngLiteral;
}

const containerStyle = {
    width: '100%',
    height: '100vh'
};

export const Map: FC<IProps> = ({ map, setMap, selectedCompany, activeMarker, setActiveMarker, setCompanyInfoVisible, data, center }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY!,
        mapIds: ['b32819489bc5a143'],
    })

    const [zoomListener, setZoomListener] = useState<number>(3)

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map)

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
        <div className={`w-full h-screen relative z-10 duration-200 ${selectedCompany !== undefined && 'pl-100 pr-4'}`}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoomListener}
                id="b32819489bc5a143"
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={(e) => e.stop()}
                options={{
                    isFractionalZoomEnabled: false,
                    minZoom: 1,
                    mapId: 'b32819489bc5a143',
                    zoom: zoomListener,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoomControl: false,
                    clickableIcons: false,
                    maxZoom: 11,
                }}
                onRightClick={(e) => {
                    e.stop()
                    setCompanyInfoVisible()
                }}
            >
                {/* when no marker selected */}
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
                {/* when marker selected and has mother company */}
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
                {/* lines for partners and markers excluding mother company */}
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
                {/* markers for child companies of selected marker */}
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
        </div >
    )
}