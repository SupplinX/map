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
    const [showAllInActive, toggleAllInActive] = useState(false)
    const inactiveClients = useMemo(() => {
        return companies?.filter(company => company.relation_end !== null)
    }, [])

    return (<div className="p-4">
        <p className="text-2xl font-medium mb-3 pl-1">Active</p>
        <div className="grid gap-4">
            {
                activeClients?.map(company => <CompanyTile key={company.connection_id} company={company.partner} mini={false} />)
            }
        </div>
        {(activeClients && activeClients.length > 2) && <MoreButton label={`${showAllActive ? 'Show less' : `Show all (${activeClients?.length})`}`} onClick={toggleAllActive.bind(true, !showAllActive)} />}
        <p className="text-2xl font-medium mb-3 mt-10 pl-1">Inactive</p>
        <div className="grid gap-4">
            {
                inactiveClients?.map(company => <CompanyTile key={company.connection_id} company={company.partner} mini={false} />)
            }
        </div>
        {(inactiveClients && inactiveClients.length > 4) && <MoreButton label={`${showAllInActive ? 'Show less' : `Show all (${inactiveClients?.length})`}`} onClick={toggleAllInActive.bind(true, !showAllInActive)} />}
    </div>
    )
}