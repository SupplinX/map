import axios from "axios";
import { FC, useEffect, useState } from "react"
import { MdClose, MdOutlineHouse, MdSearch } from 'react-icons/md'
import { useQuery } from "react-query";
import { Input } from "../../components/input/input"
import { Spinner } from "../../components/spinner"
import { useDebounce } from "../../hooks/useDebounce";
import { ICompany } from "../../types/company";

interface IProps {
    activeMarker: number | null;
    setActiveMarker: (id: number | null) => void;
    addNewHandler?: () => void
}

export const SearchCompany: FC<IProps> = ({ setActiveMarker, activeMarker, addNewHandler }) => {
    const [search, setSearch] = useState<string>('')
    const debouncedFilter = useDebounce<string>(search, 500);
    const [listVisible, setListVisible] = useState<boolean>(false)
    const { data, isLoading, error } = useQuery<ICompany[]>([
        'companies', debouncedFilter
    ], async () => {
        const { data } = await axios.get(`/supplinx/fill-map?nameContains=${debouncedFilter}`)
        return data
    }, {
        enabled: Boolean(debouncedFilter) && debouncedFilter.length > 2
    })

    useEffect(() => {
        if (search.length > 2) {
            setListVisible(true)
        } else {
            setListVisible(false)
        }
    }, [search])

    const optionClickedHandler = (id: number) => {
        setActiveMarker(id)
        setListVisible(false)
    }

    const closeHandler = () => {
        setSearch('')
        if (activeMarker) {
            setActiveMarker(null)
        }
    }

    return (
        <div className="relative w-full z-50 pointer-events-auto">
            <div className={`w-full z-50 shadow-md ${listVisible ? 'rounded-t-xl' : 'rounded-xl'} overflow-hidden flex bg-white items-center`}>
                <Input placeholder="Search company in database" value={search} onChange={setSearch} />
                <button className="flex-shrink-0 px-3 self-stretch" >
                    <MdSearch className="text-xl" />
                </button>
                <button onClick={closeHandler} className={`flex-shrink-0 self-stretch overflow-hidden duration-200 ${debouncedFilter.length > 2 ? 'w-9' : 'w-0'} flex justify-center items-center`} >
                    <MdClose className="text-xl" />
                </button>
            </div>
            {listVisible && <div className="w-full bg-white rounded-b-xl shadow-md absolute left-0 top-12 overflow-hidden">
                {isLoading && <Spinner />}
                {!isLoading && data?.map(company => (
                    <div key={company.id} className="flex flex-row items-center py-3 cursor-pointer hover:bg-gray-100 duration-200" onClick={() => optionClickedHandler(company.id)}>
                        <div className="flex-shrink-0 items-center justify-center px-3">
                            <MdOutlineHouse className="text-lg" />
                        </div>
                        <div>
                            <span className="font-medium mr-1">{company.name}</span>
                            <span className="text-xs font-normal text-gray-400">{company.street}, {company.city}</span>
                        </div>
                    </div>
                ))}
                {!isLoading && data?.length === 0 && <button onClick={() => {
                    addNewHandler?.()
                    setListVisible(false)
                }} className="block w-full text-blue-500 font-medium text-center py-2.5">
                    Company not yet listed. Click here and add manually
                </button>}
            </div>}
        </div>
    )
}