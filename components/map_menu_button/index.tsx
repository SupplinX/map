import { FC, ReactNode } from "react";

interface IProps {
    icon: ReactNode;
}

export const MapMenuButton: FC<IProps> = ({ icon }) => {
    return (
        <button className="h-14 w-14 rounded-xl bg-default-600 hover:bg-default-700 duration-200 z-50 mx-2 flex items-center justify-center text-3xl text-white shadow-md">
            {icon}
        </button>
    )
}