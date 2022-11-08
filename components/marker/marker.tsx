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
    mother?: boolean;
}

export default function CustomMarker({
    map,
    company,
    setActiveMarker,
    active,
    mother = false
}: CustomMarkerProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <>
            {map !== null && (
                <OverlayView
                    position={{
                        lat: parseFloat(company.lat),
                        lng: parseFloat(company.lng),
                    }}
                    map={map}
                >
                    <>
                        <div className="flex flex-col items-center justify-center relative -left-5 -top-14 duration-200" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setActiveMarker(company.id)}>
                            <div className={`pointer-events-none  bg-white block absolute bottom-[102%] left-1/2 transform -translate-x-1/2 transition duration-200 ${hovered ? 'opacity-100' : 'opacity-0'} rounded-md p-1 w-40`}>
                                <div className="w-full h-full border-2 border-accent-500 rounded-sm p-1">
                                    <div className="flex">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                                        <p className="font-medium ml-2">{company.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-10 h-10 transition duration-500 bg-white ${active && 'bg-yellow-400'} hover:bg-yellow-400 rounded-full flex justify-center  items-center relative`}>
                                {active && <div className="absolute right-0 top-0 w-full h-full bg-white rounded-full z-10 animate-ping"></div>}
                                <div className="w-6 h-6 rounded-full relative z-20 overflow-hidden flex justify-center items-center">
                                    {company.logo?.url ? <Image src={BASE_URL + company.logo.url} alt="Logo" width={24} height={24} /> : <p className="text-2xl font-semibold">{company.name[0]}</p>}
                                </div>

                                {
                                    mother && <div className="w-4 h-4 rounded-full absolute left-0 bottom-0 bg-red-500"></div>
                                }
                            </div>
                            <div className={`w-px h-5 bg-white ${active && 'bg-yellow-400'} -my-1 relative`}>
                            </div>
                            <div className={`w-1.5 h-1.5 bg-white ${active && 'bg-yellow-400'} rounded-full relative`}>
                            </div>
                        </div>
                    </>
                </OverlayView>
            )}
        </>
    )
}