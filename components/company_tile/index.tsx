import { FC } from "react";

interface IProps {
    label: string;
}

export const CompanyTile: FC<IProps> = ({ label }) => {
    return (
        <div className="px-3 py-3 border border-gray-300 rounded-xl flex items-center">
            <div className="flex-shrink-0 mr-4">
                <div className="w-8 h-8 bg-red-500 rounded-xl"></div>
            </div>
            <div className="flex-1">
                <p className="font-medium">{label}</p>
                <p className="text-sm">Sw. Józefa, Rybnik</p>
            </div>
        </div>
    )
}