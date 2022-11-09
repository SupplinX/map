import Image from "next/image";
import { FC } from "react";
import { BASE_URL } from "../../pages/_app";
import { IProduct } from "../../types/company";

interface IProps {
    active?: boolean;
    product: IProduct;
}

export const ProductCard: FC<IProps> = ({ active = true, product }) => {

    return (
        <div className="w-full border border-gray-300 bg-white rounded-xl overflow-hidden relative">
            {!product.active && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-70 z-10"></div>
            )}
            <div className="h-28 w-full bg-gray-200 relative">
                {
                    product.image?.url && (
                        <Image src={BASE_URL + product.image.url} alt="Photo of product" fill />
                    )
                }
            </div>
            <div className="py-3 px-3 text-center">
                <p className="font-medium leading-tight">
                    {product.name}
                </p>
                <p className="text-xs mt-2">
                    {/* {product.image?.url} */}
                </p>
            </div>
        </div>
    )
}