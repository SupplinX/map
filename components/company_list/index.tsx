import { FC, useMemo, useState } from "react"
import { ICompany, IConnection } from "../../types/company"
import { CompanyTile } from "../company_tile"
import { MoreButton } from "../more_button"
import { ProductCard } from "../product_card/product_card"

interface IProps {
    companies: IConnection[] | undefined;
}

export const CompanyList: FC<IProps> = ({ companies }) => {
    const [showAllActive, toggleAllActive] = useState(false)
    const activeClients = useMemo(() => {
        return companies?.filter(company => company.relation_end === null)
    }, [])

    return (<div className="p-4">
        <p className="text-2xl font-medium mb-3 pl-1">Active</p>
        <div className="">
            {
                activeClients?.map(company => <CompanyTile key={company.connection_id} company={company.partner} mini={false} />)
            }
        </div>
        {(activeClients && activeClients.length > 2) && <MoreButton label={`${showAllActive ? 'Show less' : `Show all (${activeClients?.length})`}`} onClick={toggleAllActive.bind(true, !showAllActive)} />}
        {/* <p className="text-2xl font-medium mb-3 mt-10 pl-1">Inactive</p>
        <div className="grid grid-cols-2 gap-2">
            {
                inactiveProducts?.slice(0, showAllInactive ? undefined : 4).map((product, index) => {
                    return <ProductCard key={'product' + index} product={product} />
                })
            }
        </div>
        {(products && products.length > 4) && <MoreButton label={`${showAllInactive ? 'Show less' : `Show all (${inactiveProducts?.length})`}`} onClick={toggleAllInactive.bind(true, !showAllInactive)} />} */}
    </div>
    )
}