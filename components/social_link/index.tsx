import { FC } from "react";
import { FaGlobe } from "react-icons/fa";

interface IProps {
    link: string;
}

export const SocialLink: FC<IProps> = ({ link }) => {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <div className="w-8 h-8 bg-black mx-1 flex items-center justify-center rounded-full">
                <FaGlobe className="text-2xl" />
            </div>
        </a>
    )
}