import axios from "axios"
import { FC, useState } from "react";
import { useQuery } from "react-query"
import { CompanyTile } from "../../../../components/company_tile";
import { Spinner } from "../../../../components/spinner"
import { ICompany, IConnection } from "../../../../types/company";
import { SearchCompany } from "../../../search_company";
import { NewCustomer } from "../../components/new_customer";

interface IProps {
    id: number;
}

export const Customers: FC<IProps> = ({ id }) => {
    const [newCompanyFormVisible, setNewCompanyFormVisible] = useState<boolean>(false)
    const [activeCustomer, setActiveCustomer] = useState<number | null>(null)
    const { isLoading, error, data } = useQuery<IConnection[]>(['customers'], {
        queryFn: async () => {
            const { data } = await axios.get(`/supplinx/company-customers/${id}`)
            console.log(data)
            return data
        }
    })

    console.log(data)

    return (
        <div>
            {isLoading && <Spinner />}
            {/* {
                !isLoading && data !== undefined && JSON.stringify(data[0])
            } */}
            <div className="grid grid-cols-2 gap-6 mt-6 border-b border-gray-300 pb-6">
                {!isLoading && data !== undefined && data?.map(d => (
                    <CompanyTile company={d.partner} key={d.partner.id} mini={false} />
                ))}
            </div>
            <div className="py-4">
                <SearchCompany activeMarker={activeCustomer} setActiveMarker={setActiveCustomer} addNewHandler={setNewCompanyFormVisible.bind(true, true)} />
            </div>
            {newCompanyFormVisible && <div className="py-4">
                <NewCustomer />
            </div>}
        </div>
    )
}