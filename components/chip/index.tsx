import { FC } from "react";

interface IProps {
    label: string;
}

export const Chip: FC<IProps> = ({ label }) => {
    return (
        <div className="block border border-gray-300 rounded-xl px-3 py-1.5 whitespace-nowrap text-sm">
            {label}
        </div>
    )
}