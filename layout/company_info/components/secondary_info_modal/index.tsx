import { FC, ReactNode, useState } from "react";
import { MdClose } from "react-icons/md";
import { CloseButton } from "../../../../components/close_button";
import { MoreButton } from "../../../../components/more_button";
import { ProductCard } from "../../../../components/product_card/product_card";

interface IProps {
    visible: boolean;
    close: () => void;
    children?: ReactNode | ReactNode[];
    name: string | undefined;
    type: string;
}

export const SecondaryInfoModal: FC<IProps> = ({ visible, close, children, name, type }) => {
    const [showAllProducts, toggleAllProducts] = useState(false)

    return (
        <div className={`w-100 h-screen overflow-hidden hover:overflow-y-scroll pr-2 hover:pr-0 bg-slate-100 absolute left-full top-0 z-30 transition duration-200 transform ${visible ? 'translate-x-0' : '-translate-x-100'}`}>
            <div className="px-3 border-b-2 border-gray-300 py-4 flex justify-between items-center">
                <div className="flex-1">
                    <p className="text-2xl font-medium"><span className="text-accent-500">{name}</span> {type}</p>
                </div>
                <CloseButton onClick={close} />
            </div>
            {children}
        </div>
    )
}

