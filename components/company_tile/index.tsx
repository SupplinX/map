import Image from "next/image";
import { FC } from "react";
import { BASE_URL } from "../../pages/_app";
import { ICompany } from "../../types/company";
import { Chip } from "../chip";

interface IProps {
    company: ICompany;
    mini?: boolean;
}

export const CompanyTile: FC<IProps> = ({ company, mini = true }) => {
    return (
        <div className="px-3 py-3 border border-gray-300 rounded-xl">
            <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                        <Image src={BASE_URL + company.logo.url} width={36} height={36} alt="Company logo" />
                    </div>
                </div>
                <div className="flex-1">
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm">{company.street}, {company.city}</p>
                </div>
            </div>
            {!mini && <div className="mt-3 flex items-center gap-2 flex-wrap">
                {
                    company.products && company.products.map(p => <Chip label={p.name} key={p.id} />)
                }
            </div>}
        </div>
    )
}