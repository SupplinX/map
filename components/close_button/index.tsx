import { FC } from "react";
import { MdClose } from "react-icons/md"

interface IProps {
    onClick: () => void;
}

export const CloseButton: FC<IProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="block p-1">
            <MdClose className="text-2xl pointer-events-none" />
        </button>
    )
}