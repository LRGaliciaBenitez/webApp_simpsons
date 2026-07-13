import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCharacters } from "../redux/charactersSlice";
import logoSimpsons from "../assets/LogoSimpsons.png";

function Header( { setIsOpen, isOpen, searchOpen, setSearchOpen } ) {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters.allCharacters);

    const handleOpenSearch = () => {
        if (characters.length === 0) {
            dispatch(fetchAllCharacters());
        }

        setSearchOpen(!searchOpen);
    };

    return (
        <header className="bg-[#FDD835] text-white py-4 px-6 w-full h-auto flex items-center justify-between">
            <img src={logoSimpsons} alt="Simpsons Logo" className="h-20 w-30"/>
            <div className="flex items-center gap-4 md:gap-8">
                <button
                    className="bg-[#FDD835] text-black text-3xl p-3 rounded-full shadow-lg
                                transition-all duration-300
                                hover:bg-white
                                hover:text-[#FDD835]
                                hover:scale-110
                                hover:-translate-y-1
                                hover:rotate-6
                                hover:shadow-[0_0_20px_rgba(253,216,53,0.8)]
                                active:scale-95
                                cursor-pointer"
                    aria-label="Buscar"
                    onClick={handleOpenSearch}
                >
                    <i className="bi bi-search"></i>
                </button>
                <button    
                    className="text-white text-3xl focus:outline-none hover:text-black transition hover:animate-bounce hover:scale-110 hover:rotate-12 hover:translate-y-1 hover:translate-x-1 cursor-pointer md:hidden" 
                    aria-label="Menú"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className="bi bi-list"></i>
                </button>
                <nav className="mt-2 luckiest text-2xl hidden md:block">
                    <ul>
                        <li className="inline-block mr-4">
                            <NavLink to="/" className={({ isActive }) => `inline-block ${isActive ? 'text-black' : 'hover:animate-bounce hover:text-black'} transition`}>
                                Home
                            </NavLink>
                        </li>
                        <li className="inline-block mr-4">
                            <NavLink to="/episodios" className={({ isActive }) => `inline-block ${isActive ? 'text-black' : 'hover:animate-bounce hover:text-black'} transition`}>
                                Episodios
                            </NavLink>
                        </li>
                        <li className="inline-block mr-4">
                            <NavLink to="/contacto" className={({ isActive }) => `inline-block ${isActive ? 'text-black' : 'hover:animate-bounce hover:text-black'} transition`}>
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </header>
    )
}

export default Header;