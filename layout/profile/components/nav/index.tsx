import { FC } from "react"

const Link: FC<{ label: string, active?: boolean }> = ({ label, active = false }) => {
    return (
        <button className={`w-1/6 border-b-4 py-4 font-medium ${active ? 'text-black border-black' : 'text-gray-400 border-white'}`}>
            {label}
        </button>
    )
}

export const ProfileNav = () => {
    return (
        <div className="flex items-center mt-5">
            <Link label={"General"} active />
            <Link label={"Business"} active/>
            <Link label={"Customers"} />
            <Link label={"Suppliers"} />
            <Link label={"Admin"} />
            <Link label={"Summary"} />
        </div>
    )
}