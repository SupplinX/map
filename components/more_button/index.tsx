import { FC } from "react"

interface IProps {
    label: string,
    onClick: () => void
}

export const MoreButton: FC<IProps> = ({ label, onClick }) => {
    return (
        <div className="mt-2 flex justify-end">
            <button className="py-1.5 text-sm mt-[2px] text-blue-500 font-medium text-right" onClick={onClick}>{label}</button>
        </div>
    )
}