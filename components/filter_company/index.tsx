import axios from "axios"
import { FC, useEffect, useState } from "react"
import { MdSearch, MdOutlineHouse, MdFilterListAlt, MdOutlineFilterAlt, MdClose } from "react-icons/md"
import { useQuery } from "react-query"
import { useDebounce } from "../../hooks/useDebounce"
import { IIndustry } from "../../types/company"
import { Input } from "../input/input"
import { Spinner } from "../spinner"

interface IProps {
    placeholder: string;
    type: 'industries' | 'products' | 'needs';
    toggleIndustry: (id: number) => void;
}

type StrapiIndustry = {
    id: number,
    attributes: IIndustry
}


export const FilterCompany: FC<IProps> = ({ placeholder, toggleIndustry, type }) => {
    const [listVisible, setListVisible] = useState<boolean>(false)
    const [chips, setChips] = useState<StrapiIndustry[]>([])

    const [search, setSearch] = useState<string>("")
    const debouncedFilter = useDebounce<string>(search, 500);
    const { data, isLoading, error } = useQuery<StrapiIndustry[]>([
        type, debouncedFilter
    ], async () => {
        const { data } = await axios.get<{ data: StrapiIndustry[] }>(`/${type}?filters[name][$containsi]=${debouncedFilter}`)
        console.log(data.data)
        return data.data
    }, {
        enabled: Boolean(debouncedFilter) && debouncedFilter.length > 2
    })

    const optionClickedHandler = (industry: StrapiIndustry) => {
        setChips([...chips, industry])
        setSearch('')
        toggleIndustry(industry.id)
    }

    const removeChip = (id: number) => {
        setChips(chips.filter(chip => chip.id !== id))
        toggleIndustry(id)
    }

    useEffect(() => {
        if (search.length > 2) {
            setListVisible(true)
        } else {
            setListVisible(false)
        }
    }, [search])

    return (
        <div className="relative w-72 z-50 pointer-events-auto">
            <div className={`w-full z-50 shadow-md ${listVisible ? 'rounded-t-xl' : 'rounded-xl'} overflow-hidden flex bg-white items-center`}>
                <Input placeholder={placeholder} value={search} onChange={setSearch} />
                <button className="flex-shrink-0 px-3 self-stretch" >
                    <MdOutlineFilterAlt className="text-xl" />
                </button>
            </div>
            <div className="mt-3 flex flex-wrap">
                {
                    chips.map((chip, index) => (
                        <div key={index} className="flex items-center bg-white rounded-xl shadow-md px-1 py-1 mr-2 mb-2">
                            <button className="px-2" onClick={() => removeChip(chip.id)}>
                                <MdClose />
                            </button>
                            <span className="text-sm pr-4">{chip.attributes.name}</span>
                        </div>
                    ))
                }
            </div>
            <div className="w-full bg-white rounded-b-xl shadow-md absolute left-0 top-12 overflow-hidden">
                {isLoading && <Spinner />}
                {
                    !isLoading && data?.map((industry, index) => (
                        <div key={'industry' + industry.id} className="flex flex-row items-center py-3 px-5 cursor-pointer hover:bg-gray-100 duration-200" onClick={() => optionClickedHandler(industry)}>
                            <span className="font-medium mr-1">{industry.attributes.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}