import { MdManageAccounts } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
const LeftSection = ({ onLinkClick, className }) => {

    const links = [
        { id: 1, text: "Account", icon: <MdManageAccounts className=" text-xl"/> },
        { id: 2, text: "Orders", icon: <TbTruckDelivery className="text-xl"/> },

    ]

    return (
        <div className={`  ${className || ""} h-full md:h-screen md:border`}>
            <div className="space-y-5 md:p-5">
                <h1 className="hidden md:block text-xl text-gray-700 font-bold mt-5 mb-10">General</h1>
                <div >
                    <ul className=' md:space-y-5 space-x-4 md:space-x-0 flex items-center justify-start md:block'>
                        {links.map((link) => (
                            <li key={link.id} >
                                <button className="bg-black hover:bg-black/[0.8] duration-150 text-gray-100 p-2 md:px-2 px-3 w-full text-md flex items-center justify-start gap-2" onClick={() => onLinkClick(link.id)}>{link.icon} {link.text}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftSection
