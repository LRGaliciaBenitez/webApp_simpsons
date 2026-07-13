import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardPersonaje from "./cards/CardPersonaje";
import dona from "../assets/dona2.png";

function Search({ searchOpen, setSearchOpen }) {

    const navigate = useNavigate();

    const { allCharacters, loadingSearch, error } = useSelector(
        (state) => state.characters
    );

    const [searchTerm, setSearchTerm] = useState("");

    const filteredCharacters =
        searchTerm.trim() === ""
            ? []
            : allCharacters.filter((personaje) =>
                personaje.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );

    useEffect(() => {
        if (searchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [searchOpen]);

    return (
        <div
            className={`
                fixed inset-0 z-50
                py-4 px-6
                bg-black/50
                overflow-y-auto
                transition-all duration-300 ease-in-out
                ${
                    searchOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                }
            `}
        >
            <button
                className="absolute top-4 right-4 text-white text-3xl hover:text-[#FDD835] transition cursor-pointer hover:animate-bounce hover:scale-125 hover:rotate-12 hover:translate-y-1 hover:translate-x-1"
                onClick={() => setSearchOpen(false)}
            >
                <i className="bi bi-x"></i>
            </button>

            <div className="flex justify-center pt-24">
                <input
                    type="text"
                    placeholder="Buscar personaje..."
                    className="w-3/5 max-w-xl px-4 py-3 mb-5 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDD835]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loadingSearch ? (
                <div className="h-full flex flex-col gap-4 items-center justify-center" >

                    <img src={dona} alt="Cargando..." className="w-20 h-20 animate-spin" />

                    <p className="text-2xl font-semibold luckiest text-[#FDD835]">
                    Cargando personajes...
                    </p> 

                </div>
                
            ) : error ? (
                <div className="h-full flex flex-col gap-4 items-center justify-center" >
                    <p className="text-red-500 text-xl font-bold">
                        {error}
                    </p>
                </div>
            ) : (
                <>

                    {searchTerm.trim() !== "" && filteredCharacters.length === 0 && (
                        <p className="text-center text-white luckiest text-2xl font-semibold mt-10">
                            No se encontraron personajes.
                        </p>
                    )}

                    <section className="w-full max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center"> 
                        {filteredCharacters.map((personaje) => (
                                <CardPersonaje
                                    key={personaje.id}
                                    onClick={() => navigate(`/personaje/${personaje.id}`)}
                                    personaje={personaje}
                                />
                            ))} 
                    </section>
                </>
                
            )}
        </div>
    );
}

export default Search;