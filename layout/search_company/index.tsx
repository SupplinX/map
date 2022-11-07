import { FC, useEffect, useState } from "react"
import { MdOutlineHouse, MdSearch } from 'react-icons/md'
import { Input } from "../../components/input/input"
import { Spinner } from "../../components/spinner"

interface IProps {
    setCompanyInfoVisible: () => void;
}

export const SearchCompany: FC<IProps> = ({ setCompanyInfoVisible }) => {
    const [search, setSearch] = useState<string>('')
    const [listVisible, setListVisible] = useState<boolean>(false)

    useEffect(() => {
        if (search.length > 2) {
            setListVisible(true)
        } else {
            setListVisible(false)
        }
    }, [search])

    const optionClickedHandler = () => {
        setCompanyInfoVisible()
        setListVisible(false)
    }

    return (
        <div className="relative w-96 z-50 pointer-events-auto">
            <div className={`w-full z-50 shadow-md ${listVisible ? 'rounded-t-xl' : 'rounded-xl'} overflow-hidden flex bg-white items-center`}>
                <Input placeholder="Search company in database" value={search} onChange={setSearch} />
                <button className="flex-shrink-0 px-3 self-stretch" >
                    <MdSearch className="text-xl" />
                </button>
            </div>
            {listVisible && <div className="w-full bg-white rounded-b-xl shadow-md absolute left-0 top-12">
                {/* <Spinner /> */}
                <div className="flex flex-row items-center py-3 cursor-pointer hover:bg-gray-100 duration-200" onClick={optionClickedHandler}>
                    <div className="flex-shrink-0 items-center justify-center px-3">
                        <MdSearch className="text-lg" />
                    </div>
                    <div>
                        <span className="font-medium mr-1">JohnCube</span>
                        <span className="text-xs font-normal text-gray-400">43 results</span>
                    </div>
                </div>
                <div className="flex flex-row items-center py-3 cursor-pointer hover:bg-gray-100 duration-200">
                    <div className="flex-shrink-0 items-center justify-center px-3">
                        <MdOutlineHouse className="text-lg" />
                    </div>
                    <div>
                        <span className="font-medium mr-1">JohnCube</span>
                        <span className="text-xs font-normal text-gray-400">Św. Józefa, Rybnik</span>
                    </div>
                </div>
                <div className="flex flex-row items-center py-3 cursor-pointer hover:bg-gray-100 duration-200">
                    <div className="flex-shrink-0 items-center justify-center px-3">
                        <MdOutlineHouse className="text-lg" />
                    </div>
                    <div>
                        <span className="font-medium mr-1">JohnCube</span>
                        <span className="text-xs font-normal text-gray-400">Św. Józefa, Rybnik</span>
                    </div>
                </div>
            </div>}
        </div>
    )
}