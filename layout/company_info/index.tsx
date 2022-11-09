import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "../../components/button";
import { MdApartment, MdKeyboardArrowDown, MdOutlinePeopleAlt } from "react-icons/md";
import { FaFacebookF, FaGlobe, FaInstagram, FaTiktok, FaTwitter, FaYoutube, } from "react-icons/fa";
import { SiPolywork } from 'react-icons/si'
import { RiToolsFill } from "react-icons/ri";
import { Chip } from "../../components/chip";
import { CompanyTile } from "../../components/company_tile";
import { EvaluationGraph } from "../../components/evaluation_graph";
import { ServiceCard } from "../../components/service_card";
import { SecondaryInfoModal } from "./components/secondary_info_modal";
import { MoreButton } from "../../components/more_button";
import { useQuery } from "react-query";
import axios from 'axios'
import { Spinner } from "../../components/spinner";
import { ICompany } from "../../types/company";
import Image from "next/image";
import { BASE_URL } from "../../pages/_app";
import { ProductList } from "../../components/products_list";
import { CompanyList } from "../../components/company_list";

interface IProps {
    visible: boolean;
    activeMarker: number | null;
    data: ICompany | undefined;
    isLoading: boolean;
    toggleProfile: () => void;
}

export const CompanyInfo: FC<IProps> = ({ visible, activeMarker, data, isLoading, toggleProfile }) => {
    const [secondaryVisible, setSecondaryVisible] = useState(false)
    const [secondaryInfoType, setSecondaryInfoType] = useState<'products' | 'customers' | 'needs' | 'suppliers' | ''>('')
    const clients = useMemo(() => {
        return data?.partners.filter(partner => partner.type === 'client')
    }, [data])
    const suppliers = useMemo(() => {
        return data?.partners.filter(partner => partner.type === 'supplier')
    }, [data])

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
                                {data?.logo?.url ? <Image src={BASE_URL + data?.logo.url} alt="Loog" width={80} height={80} /> : null}
                            </div>
                            <div className="flex flex-col justify-center">
                                <Button label="Contact" />
                                <div className="h-1"></div>
                                <Button label="Profile" primary={false} onClick={toggleProfile}/>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-medium">{data?.name}</p>
                            <p className="mt-4 text-sm leading-5">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                    <div className="py-4 border-b text-lg border-gray-200 px-2 flex justify-center items-center text-white duration-200">
                        <a href={data?.website} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <FaGlobe className="text-2xl" />
                            </div>
                        </a>
                        {data?.twitter && <a href={data?.twitter} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <FaTwitter className="" />
                            </div>
                        </a>}
                        {data?.facebook && <a href={data?.facebook} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <FaFacebookF className="" />
                            </div>
                        </a>}
                        {data?.youtube && <a href={data?.youtube} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <FaYoutube className="" />
                            </div>
                        </a>}
                        {data?.instagram && <a href={data?.instagram} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <FaInstagram className="" />
                            </div>
                        </a>}
                        {data?.tiktok && <a href={data?.tiktok} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <FaTiktok className="te" />
                            </div>
                        </a>}
                        {data?.polywork && <a href={data?.polywork} target="_blank" rel="noreferrer">
                            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                                <SiPolywork className="" />
                            </div>
                        </a>}
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
                            {/* <div className="pl-5">
                                <MdKeyboardArrowDown className="text-xl" />
                            </div> */}
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
                                <p className="text-sm">{data?.main_industry.name}</p>
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
                        {(data?.products && data?.products.length > 0) && <MoreButton onClick={() => {
                            setSecondaryVisible(!secondaryVisible)
                            setSecondaryInfoType('products')
                        }} label="Show details" />}
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Needs</p>
                        <div className="flex flex-row flex-wrap gap-2 mt-3">
                            {
                                data?.needs.map((need, index) => (
                                    <Chip key={index} label={need.name} />
                                ))
                            }
                        </div>
                        {(data?.needs && data?.needs.length > 0) && <MoreButton onClick={() => {
                            setSecondaryVisible(!secondaryVisible)
                            setSecondaryInfoType('needs')
                        }} label="Show details" />}
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Customers</p>
                        <div className="flex flex-col gap-2 mt-3">
                            {
                                clients?.slice(0, 3).map((partner, index) => (
                                    <CompanyTile company={partner.partner} key={'partner_' + partner.partner.id} />
                                ))
                            }
                        </div>
                        {clients !== undefined && clients.length > 0 && <MoreButton onClick={() => {
                            setSecondaryVisible(!secondaryVisible)
                            setSecondaryInfoType('customers')
                        }} label={`Show details (${clients.length})`} />}
                    </div>
                    <div className="py-4 px-2 border-b border-gray-200">
                        <p className="text-xl font-medium">Suppliers</p>
                        <div className="flex flex-col gap-2 mt-3">
                            {
                                suppliers?.slice(0, 3).map((partner, index) => (
                                    <CompanyTile company={partner.partner} key={'partner_' + partner.partner.id} />
                                ))
                            }
                        </div>
                        {suppliers !== undefined && suppliers.length > 0 && <MoreButton onClick={() => {
                            setSecondaryVisible(!secondaryVisible)
                            setSecondaryInfoType('suppliers')
                        }} label={`Show details (${suppliers.length})`} />}
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
            <SecondaryInfoModal visible={secondaryVisible} close={setSecondaryVisible.bind(true, !secondaryVisible)} name={data?.name} type={secondaryInfoType}>
                {secondaryInfoType === 'products' && <div>
                    <ProductList products={data?.products} />
                </div>}
                {secondaryInfoType === 'needs' && <div>
                    <ProductList products={data?.needs} />
                </div>}
                {secondaryInfoType === 'customers' && <div>
                    <CompanyList companies={clients} />
                </div>}
                {secondaryInfoType === 'suppliers' && <div>
                    <CompanyList companies={suppliers} />
                </div>}
            </SecondaryInfoModal>
        </div>
    )
}