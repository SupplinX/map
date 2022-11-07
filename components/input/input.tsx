import { FC } from "react";

interface IProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const Input: FC<IProps> = ({ onChange, placeholder, value }) => {
    return (
        <div className="w-full">
            <input type="text" className="w-full px-5 py-3 outline-none bg-white  pointer-events-auto" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}