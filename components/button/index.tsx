import { FC } from "react";

interface IProps {
    primary?: boolean;
    label: string;
    onClick?: () => void
}

export const Button: FC<IProps> = ({ label, primary = true, onClick }) => {
    return (
        <button onClick={onClick} className={`rounded-full px-4 py-0.5 border border-default-600 ${primary ? 'bg-default-600 text-white' : 'bg-white text-default-600'} block font-medium`}>
            {label}
        </button>
    )
}