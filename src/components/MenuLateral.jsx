import { NavLink } from "react-router-dom";

function MenuLateral( { isOpen, setIsOpen } ) {

    return (
        <div className={` 
                        text-white
                        py-4
                        px-6
                        flex
                        items-center
                        justify-bnetween
                        gap-4
                        z-50
                        fixed
                        top-35
                        right-0
                        w-[80vw]
                        h-[70vh]
                        bg-[#FDD835]/90
                        backdrop-blur-md
                        rounded-l-lg
                        shadow-2xl
                        transform
                        transition-transform
                        duration-300
                        ease-in-out
                        ${isOpen ? "translate-x-0" : "translate-x-full"}
                        md:hidden
                        `
        }>
            <div className="absolute top-2 right-2">
                <button 
                    className="text-white text-3xl focus:outline-none hover:text-black transition hover:animate-bounce hover:scale-110 hover:rotate-12 hover:translate-y-1 hover:translate-x-1 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <ul className="mt-2 luckiest text-2xl flex flex-col gap-4">
                <li>
                    <NavLink to="/" className={({ isActive }) => `inline-block ${isActive ? 'text-black' : 'hover:animate-bounce hover:text-black'} transition`}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/episodios" className={({ isActive }) => `inline-block ${isActive ? 'text-black' : 'hover:animate-bounce hover:text-black'} transition`}>
                        Episodios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contacto" className={({ isActive }) => `inline-block ${isActive ? 'text-black' : 'hover:animate-bounce hover:text-black'} transition`}>
                        Contacto
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default MenuLateral;