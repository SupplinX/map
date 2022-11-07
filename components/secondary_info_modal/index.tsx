import { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import { CloseButton } from "../close_button";
import { MoreButton } from "../more_button";
import { ProductCard } from "../product_card/product_card";

interface IProps {
    visible: boolean;
    close: () => void;
}

export const SecondaryInfoModal: FC<IProps> = ({ visible, close }) => {
    const [showAllProducts, toggleAllProducts] = useState(false)

    return (
        <div className={`w-100 h-screen overflow-hidden hover:overflow-y-auto pr-2 hover:pr-0 bg-slate-100 absolute left-full top-0 z-30 transition duration-200 transform ${visible ? 'translate-x-0' : '-translate-x-100'}`}>
            <div className="px-3 border-b-2 border-gray-300 py-4 flex justify-between items-center">
                <div className="flex-1">
                    <p className="text-2xl font-medium"><span className="text-accent-500">JohnCube</span> products</p>
                </div>
                <CloseButton onClick={close} />
            </div>
            <div className="p-4">
                <p className="text-2xl font-medium mb-3">Active</p>
                <div className="grid grid-cols-2 gap-2">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <MoreButton label="Show all (10)" onClick={toggleAllProducts.bind(true, true)} />
            </div>
            <div className="p-4">
                <p className="text-2xl font-medium mb-3">Inactive</p>
                <div className="grid grid-cols-2 gap-2">
                    <ProductCard active={false} />
                    <ProductCard active={false} />
                    <ProductCard active={false} />
                    <ProductCard active={false} />
                </div>
                <MoreButton label="Show all (10)" onClick={toggleAllProducts.bind(true, true)} />
            </div>
        </div>
    )
}