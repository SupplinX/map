import { FC } from "react";

interface IProps {
    active?: boolean;
}

export const ProductCard: FC<IProps> = ({ active = true }) => {
    return (
        <div className="w-full border border-gray-300 bg-white rounded-xl overflow-hidden relative">
            {!active && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-70 z-10"></div>
            )}
            <div className="h-28 w-full bg-gray-200">

            </div>
            <div className="py-3 px-3 text-center">
                <p className="font-medium leading-tight">
                    Product name
                    max two lines
                </p>
                <p className="text-xs mt-2">
                    Wholesale Appliances, Electrical, & Electronics
                </p>
            </div>
        </div>
    )
}