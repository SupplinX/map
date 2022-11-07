import { FC } from "react";
import { IoShieldCheckmarkSharp } from 'react-icons/io5'

interface IProps {
    label: string;
    active?: boolean
}

export const ServiceCard: FC<IProps> = ({ label, active = true }) => {
    return (
        <div className={`w-[calc(50%-0.66rem)] rounded-xl py-4 px-5 flex flex-col items-center bg-white border border-gray-300 relative overflow-hidden`}>
            <IoShieldCheckmarkSharp className="text-3xl text-green-500" />
            <p className="mt-3 text-center text-sm">
                {label}
            </p>
            {!active &&
                <div className="absolute left-0 top-0 w-full h-full bg-gray-400 opacity-70"></div>
            }
        </div>
    )
}