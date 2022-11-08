import { FC, useEffect, useState } from "react";
import { Button } from "../../components/button";
import { MdApartment, MdKeyboardArrowDown, MdOutlinePeopleAlt } from "react-icons/md";
import { FaFacebookSquare, FaGlobe, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import { RiToolsFill } from "react-icons/ri";
import { Chip } from "../../components/chip";
import { CompanyTile } from "../../components/company_tile";
import { EvaluationGraph } from "../../components/evaluation_graph";
import { ServiceCard } from "../../components/service_card";
import { SecondaryInfoModal } from "../../components/secondary_info_modal";
import { MoreButton } from "../../components/more_button";
import { useQuery } from "react-query";
import axios from 'axios'
import { Spinner } from "../../components/spinner";
import { ICompany } from "../../types/company";
import Image from "next/image";
import { BASE_URL } from "../../pages/_app";

interface IProps {
    visible: boolean;
    activeMarker: number | null;
}

export const CompanyInfo: FC<IProps> = ({ visible, activeMarker }) => {
    const { isLoading, data, error } = useQuery<ICompany>({
        queryKey: 'company' + activeMarker,
        queryFn: async () => {
            const { data } = await axios.get(`/custom-company/company-info/${activeMarker}`)
            console.log(data)
            return data
        },
        enabled: activeMarker !== null
    })
    const [secondaryVisible, setSecondaryVisible] = useState(false)

    useEffect(() => {
        if (!visible) setSecondaryVisible(false)
    }, [visible])

    return (
        <div className={`absolute left-0 top-0 z-40 transition duration-200 transform ${visible ? 'translate-x-0' : '-translate-x-100'}`}>
            <div className={`relative w-100 h-screen bg-white z-40 shadow-md overflow-hidden hover:overflow-y-scroll pr-2 hover:pr-0 pt-16`}>
                {!isLoading ? <div>
                    <div className="py-2 px-2 border-b border-gray-200 pb-5">
                        <div className="flex justify-between items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
                                {data?.logo.url ? <Image src={BASE_URL + data?.logo.url} alt="Loog" width={80} height={80} /> : null}
                            </div>
                            <div className="flex flex-col justify-center">
                                <Button label="Contact" />
                                <div className="h-1"></div>
                                <Button label="Profile" primary={false} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-medium">{data?.name}</p>
                            <p className="mt-4 text-sm leading-5">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                    <div className="py-4 border-b text-3xl border-gray-200 px-2 flex justify-center items-center">
                        <FaGlobe className="mx-2 text-2xl" />
                        <FaTwitterSquare className="mx-2 text-sky-400" />
                        <FaFacebookSquare className="mx-2 text-blue-500" />
                        <FaYoutubeSquare className="mx-2 text-red-500" />
                        <FaInstagramSquare className="mx-2 text-rose-400" />
                        <FaLinkedin className="mx-2 text-blue-600" />
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="pr-5">
                                <MdApartment className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{data?.street} {data?.street_code}</p>
                                <p className="text-sm">{data?.city}, {data?.country}</p>
                            </div>
                            <div className="pl-5">
                                <MdKeyboardArrowDown className="text-xl" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="pr-5 mt-0.5">
                                <MdOutlinePeopleAlt className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Employees</p>
                                <p className="text-sm">{data?.size}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="pr-5 mt-0.5">
                                <RiToolsFill className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Industry</p>
                                <p className="text-sm">Custom software development</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Products</p>
                        <div className="flex flex-row flex-wrap gap-2 mt-3">
                            {
                                data?.products.map((product, index) => (
                                    <Chip key={index} label={product.name} />
                                ))
                            }
                        </div>
                        <MoreButton onClick={setSecondaryVisible.bind(true, !secondaryVisible)} label="Show details" />
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Needs</p>
                        <div className="flex flex-row flex-wrap gap-2 mt-3">
                            <Chip label="Full stack developer" />
                            <Chip label="Sales Representative" />
                            <Chip label="Business Angel" />
                        </div>
                        <MoreButton onClick={setSecondaryVisible.bind(true, !secondaryVisible)} label="Show details" />
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Customers</p>
                        <div className="flex flex-col gap-2 mt-3">
                            <CompanyTile label="Breathment" />
                            <CompanyTile label="Lemon.io" />
                            <CompanyTile label="White Octopus" />
                        </div>
                        <MoreButton onClick={setSecondaryVisible.bind(true, !secondaryVisible)} label={`Show all (${5})`} />
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Suppliers</p>
                        <div className="flex flex-col gap-2 mt-3">
                            <CompanyTile label="Breathment" />
                        </div>
                        {/* <div className="mt-2">
                    <p className="py-1.5 text-sm mt-[2px] text-blue-500 font-medium text-right">Show all (5)</p>
                </div> */}
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Evaluation</p>
                        <div className="mt-3 flex justify-center">
                            <EvaluationGraph value={50} label="Overall score" />
                        </div>
                        <div className="flex flex-wrap gap-6 mt-6 justify-between px-5">
                            <EvaluationGraph value={50} label="Payment discipline" />
                            <EvaluationGraph value={50} label="Pricing policy" />
                            <EvaluationGraph value={50} label="Cooperation standards" />
                            <EvaluationGraph value={50} label="Communi-cation" />
                            <EvaluationGraph value={50} label="Change management" />
                            <EvaluationGraph value={50} label="Leadership culture" />
                        </div>
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Services</p>
                        <div className="flex flex-wrap mt-4 gap-5 justify-between">
                            <ServiceCard label="Insure your contract" />
                            <ServiceCard label="Finance your contract" />
                            <ServiceCard label="Global trade advisory" active={false} />
                            <ServiceCard label="Legal advisory" active={false} />
                        </div>
                    </div>
                </div> : <Spinner />}
            </div>
            <SecondaryInfoModal visible={secondaryVisible} close={setSecondaryVisible.bind(true, !secondaryVisible)} />
        </div>
    )
}