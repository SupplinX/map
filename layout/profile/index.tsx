import { FC } from "react";
import { ProfileNav } from "./components/nav"
import { Customers } from "./layout/customers"

interface IProps {
    id: number | null;
}

export const Profile: FC<IProps> = ({ id }) => {
    if (id === null) return null
    return (
        <div className="fixed left-0 right-0 top-0 h-screen w-screen bg-black bg-opacity-70 flex justify-end z-[60] animate-fade_in">
            <div className="w-3/5 h-full bg-white animate-fade_up p-5">
                <p className="text-2xl text-center">Company profile</p>
                <ProfileNav />
                <Customers id={id} />
            </div>
        </div>
    )
}