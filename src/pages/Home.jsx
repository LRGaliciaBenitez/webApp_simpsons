import Header from "../components/Header";
import MenuLateral from "../components/MenuLateral";
import Search from "../components/Search";
import { useMenu } from "../hooks/useMenu";
import { useSearch } from "../hooks/useSearch";
import CardPersonaje from "../components/cards/CardPersonaje";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCharacters } from "../redux/charactersSlice";
import { usePagination } from "../hooks/usePagination";
import dona from "../assets/dona2.png";
import { useNavigate } from "react-router-dom";

function Home() {
    const [isOpen, setIsOpen] = useMenu();
    const [searchOpen, setSearchOpen] = useSearch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page, nextPage, prevPage } = usePagination();

    const { results, loading, error } = useSelector(
        (state) => state.characters
    );

    useEffect(() => {
            dispatch(fetchCharacters(page));
    }, [dispatch, page]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header 
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
            />
            <Search 
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
            />
            <MenuLateral 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <main className="flex-1 bg-[#E3F2FD] py-4 px-6 flex">
                <section className={`flex-1 py-4 px-6`}>
                    <h1 className="text-4xl font-bold text-center mb-6 luckiest text-[#FDD835]">Personajes de Los Simpsons</h1>
                    {loading ? (
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
                            <section className="w-full max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                                {results.map((personaje) => (
                                <CardPersonaje
                                    key={personaje.id}
                                    onClick={() => navigate(`/personaje/${personaje.id}`)}
                                    personaje={personaje}
                                />
                                ))}
                            </section>
                            <div className="w-full flex justify-center mt-6">
                                <button 
                                    className={`${page === 1 ? 'opacity-50 cursor-not-allowed disabled: bg-gray-50' : 'hover:animate-bounce hover:scale-110 hover:-rotate-12 hover:-translate-y-1 hover:-translate-x-1 bg-[#FDD835]  hover:bg-[#FBC02D] transition duration-300 cursor-pointer'} py-2 px-4 rounded-lg shadow-md text-black`}
                                    onClick={prevPage}
                                >
                                    <i class="bi bi-arrow-left"></i>
                                </button>
                                <p>
                                    <span className="mx-4 text-lg text-center fredoka font-semibold text-black">Página {page}</span>
                                </p>
                                <button 
                                    className="bg-[#FDD835] text-black py-2 px-4 rounded-lg shadow-md hover:bg-[#FBC02D] transition duration-300 cursor-pointer hover:animate-bounce hover:scale-110 hover:rotate-12 hover:translate-y-1 hover:translate-x-1" 
                                    onClick={nextPage}
                                >
                                    <i class="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </>
                        
                    )}
                </section>
            </main>
        </div>
            
        
    )
}

export default Home;