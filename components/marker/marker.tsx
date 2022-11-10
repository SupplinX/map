import Image from "next/image";
import { useMemo, useState } from "react";
import { MdApartment } from "react-icons/md";
import { BASE_URL } from "../../pages/_app";
import { ICompany } from "../../types/company";
import { Chip } from "../chip";
// import { Hotel } from "../../types/hotel";
import OverlayView from "./overlay_view";

interface CustomMarkerProps {
    map: google.maps.Map | null;
    company: ICompany;
    active?: boolean;
    setActiveMarker: (id: number) => void;
    type?: 'client' | 'supplier' | 'child' | 'mother';
}

export default function CustomMarker({
    map,
    company,
    setActiveMarker,
    active,
    type
}: CustomMarkerProps) {
    const [hovered, setHovered] = useState(false)
    const border = useMemo(() => {
        return active ? ' border-red_marker ' : type === 'client' ? ' border-accent-500 ' : type === 'supplier' ? 'border-yellow_marker' : type === 'child' ? 'border-rose-300' : type === 'mother' ? ' border-red-900 ' : 'border-white'
    }, [active])

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
                        <div className="flex flex-col  items-center justify-center relative -left-6 -top-16 duration-200" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setActiveMarker(company.id)}>
                            {/* modal on top on hover */}
                            <div className={`pointer-events-none  bg-white block absolute bottom-[120%] left-1/2 transform -translate-x-1/2 transition duration-200 ${hovered ? 'opacity-100' : 'opacity-0'} rounded-md p-1 w-48`}>
                                <div className={`w-full h-full border-2 ${border} rounded-sm p-2`}>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                            {company.logo?.url ? <Image src={BASE_URL + company.logo.url} alt="Logo" width={24} height={24} /> : <MdApartment className="text-xl" />}
                                        </div>
                                        <p className="font-medium ml-2 mt-0.5">{company.name}</p>
                                    </div>
                                    {company.main_industry && <div className="pt-1.5 pb-1 px-2 border border-gray-300 rounded-md mt-2">{company.main_industry.name}</div>}
                                </div>
                            </div>
                            {/* marker */}
                            <div className={`w-12 h-12 transition duration-500 bg-white hover:bg-yellow-400 rounded-full flex justify-center  items-center relative`}>
                                {active && <div className="absolute right-0 top-0 w-full h-full bg-white rounded-full z-10 animate-ping"></div>}


                                <div className={`w-10 h-10 border-[3px] p-1 ${border} rounded-full relative z-20 flex justify-center items-center`}>
                                    <div className="w-6 h-6 rounded-full overflow-hidden relative">
                                        {company.logo?.url ? <Image src={BASE_URL + company.logo.url} alt="Logo" width={24} height={24} /> :
                                            <MdApartment className="text-2xl" />}
                                    </div>
                                </div>

                                {
                                    type === 'mother' && <div className="w-4 h-4 rounded-full absolute right-0 bottom-0 bg-red-500 z-50"></div>
                                }
                            </div>
                            <div className={`w-px h-5 bg-white -my-1 relative`}>
                            </div>
                            <div className={`w-1.5 h-1.5 bg-white rounded-full relative`}>
                            </div>
                        </div>
                    </>
                </OverlayView>
            )}
        </>
    )
}