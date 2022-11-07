import Image from "next/image";
import { useMemo, useState } from "react";
import { BASE_URL } from "../../pages/_app";
import { ICompany } from "../../types/company";
// import { Hotel } from "../../types/hotel";
import OverlayView from "./overlay_view";

interface CustomMarkerProps {
    map: google.maps.Map | null;
    company: ICompany;
    active?: boolean;
    setActiveMarker: (id: number) => void;
}

export default function CustomMarker({
    map,
    company,
    setActiveMarker
}: CustomMarkerProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <>
            {map !== null && (
                <OverlayView
                    position={{
                        lat: parseFloat(company.lat),
                        lng: parseFloat(company.lon),
                    }}
                    map={map}
                >
                    <div className="flex flex-col items-center justify-center relative -left-4 -top-12 duration-200" onClick={() => setActiveMarker(company.id)}>
                        <div className="w-8 h-8 transition duration-500 bg-white hover:bg-yellow-400 rounded-full flex justify-center  items-center relative">
                            <div className="absolute right-0 top-0 w-4 h-8 bg-gray-200 rounded-r-full z-10"></div>
                            <div className="w-6 h-6 rounded-full relative z-20 overflow-hidden">
                                <Image src={BASE_URL + company.logo.url} alt="Logo" width={24} height={24} />
                            </div>
                        </div>
                        <div className="w-1 h-5 bg-white -my-1 relative">
                            <div className="absolute right-0 top-0 w-0.5 h-5 bg-gray-200 z-10"></div>
                        </div>
                        <div className="w-2 h-2 bg-white rounded-full relative">
                            <div className="absolute right-0 top-0 w-1 h-2 bg-gray-200 rounded-r-full z-10"></div>
                        </div>
                    </div>
                </OverlayView>
            )}
        </>
    )
}