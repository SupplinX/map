import { FC, useEffect } from "react";

interface IProps {
    path: google.maps.LatLngLiteral[] | google.maps.LatLng[];
    activeMarker: number | null;
    map: google.maps.Map | null | undefined
}

export const CustomPolyline: FC<IProps> = ({ path, activeMarker, map }) => {

    useEffect(() => {
        const polyline = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#fff',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        if (map) {
            polyline.setMap(map);
        }
        return () => {
            console.log('unmount')
            polyline.setMap(null);
        }
    }, [])

    // useEffect(() => {
    //     if (activeMarker === null) {
    //         polyline.setMap(null);
    //     }
    // }, [activeMarker])

    return null
}