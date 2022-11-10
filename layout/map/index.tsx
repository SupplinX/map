import { GoogleMap, Marker, Polygon, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { FC, useCallback, useEffect, useState } from 'react';
import { CurveMarker, kurwaNaMapie } from '../../components/curve_line';
import CustomMarker from '../../components/marker/marker';
import { useQuery } from 'react-query'
import axios from 'axios'
import { ICompany, IConnection } from '../../types/company';
import { CustomPolyline } from './components/polyline';
import { Map } from './components/map';

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
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [center, setCenter] = useState({ lat: 50.117052, lng: 18.703157 })
    useEffect(() => {
        if (selectedCompany !== undefined && map !== undefined) {
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(new google.maps.LatLng(parseFloat(selectedCompany.lat), parseFloat(selectedCompany.lng)));
            if (selectedCompany.mother_company) {
                bounds.extend(new google.maps.LatLng(parseFloat(selectedCompany.mother_company.lat), parseFloat(selectedCompany.mother_company.lng)));
            }
            if (selectedCompany.child_companies && selectedCompany.child_companies.length > 0) {
                for (const company of selectedCompany.child_companies) {
                    bounds.extend(new google.maps.LatLng(parseFloat(company.lat), parseFloat(company.lng)));

                }
            }
            // setCenter({ lat: parseFloat(selectedCompany.lat), lng: parseFloat(selectedCompany.lng) })
            if (selectedCompany.partners.length > 0) {
                for (const partner of selectedCompany.partners) {
                    console.log("Partner")
                    bounds.extend(new google.maps.LatLng(parseFloat(partner.partner.lat), parseFloat(partner.partner.lng)))

                }
            }
            setTimeout(() => {
                console.log(bounds)
                map?.fitBounds(bounds, 100)
                map?.setCenter(bounds.getCenter())
                setCenter(bounds.getCenter() ? bounds.getCenter() as unknown as { lat: number, lng: number } : { lat: parseFloat(selectedCompany.lat), lng: parseFloat(selectedCompany.lng) })
                const zoom = map?.getZoom()
                if (zoom !== undefined)
                    map?.setZoom(zoom - 0.01)
            }, 500)
        }
    }, [selectedCompany])

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
            if (data.length === 0)
                return data
            const bounds = new google.maps.LatLngBounds();
            for (const company of data) {
                bounds.extend(new google.maps.LatLng(parseFloat(company.lat), parseFloat(company.lng)));
            }
            setTimeout(() => {
                console.log(bounds)
                map?.fitBounds(bounds, 100)
                map?.setCenter(bounds.getCenter())
                setCenter(bounds.getCenter() as unknown as { lat: number, lng: number })
                const zoom = map?.getZoom()
                if (zoom !== undefined)
                    map?.setZoom(zoom - 0.01)
            }, 500)
            return data
        }
    })
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAu8GpDD32d_lLAtHP_tZyWhkbAzXRIy9E",
        mapIds: ['b32819489bc5a143'],
    })

    if (!isLoaded) return null

    return (
        <Map activeMarker={activeMarker} center={center} data={data} map={map} selectedCompany={selectedCompany} setActiveMarker={setActiveMarker} setCompanyInfoVisible={setCompanyInfoVisible} setMap={setMap} />
    )
}