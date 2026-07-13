import Header from "../components/Header";
import MenuLateral from "../components/MenuLateral";
import Search from "../components/Search";
import { useMenu } from "../hooks/useMenu";
import { useSearch } from "../hooks/useSearch";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCharacterById } from "../redux/charactersSlice";
import dona from "../assets/dona2.png";


function InfoPersonaje() {
    const [isOpen, setIsOpen] = useMenu();
    const [searchOpen, setSearchOpen] = useSearch();
    const { id } = useParams();
    const dispatch = useDispatch();

    const IMAGE_BASE_URL = "https://cdn.thesimpsonsapi.com/500";

    const { character, loadingCharacter, errorCharacter } = useSelector(
        (state) => state.characters
    );

    useEffect(() => {
        dispatch(fetchCharacterById(id));
    }, [dispatch, id]);

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
            <main className="flex-1 py-4 px-6 flex">
                <section className={`flex-1 py-4 px-6`}>
                    {loadingCharacter || !character ? (
                        <div className="h-full w-full flex flex-col gap-4 items-center justify-center" >

                            <img src={dona} alt="Cargando..." className="w-20 h-20 animate-spin" />

                            <p className="text-2xl font-semibold luckiest text-[#FDD835]">
                            Cargando personaje...
                            </p> 

                        </div>
                        
                    ) : errorCharacter ? (
                        <div className="h-full flex flex-col gap-4 items-center justify-center" >
                            <p className="text-red-500 text-xl font-bold">
                                {errorCharacter}
                            </p>
                        </div>
                    ) : (
                        <section className="w-full max-w-[90%] mx-auto">
                            <h1 className="text-4xl font-bold text-center mb-6 luckiest text-[#FDD835]">{character.name}</h1>
                            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                                <img src={`${IMAGE_BASE_URL}${character.portrait_path}`} alt={character.name} className="w-64 h-64 rounded-lg shadow-lg shadow-[#FDD835]/50 hover:shadow-[0_0_25px_rgba(253,216,53,0.6)]" />
                                <div className="flex flex-col gap-4">
                                    <p className="text-lg font-semibold fredoka">Edad: <span className="font-normal">{character.age || "Edad no disponible"}</span></p>
                                    <p className="text-lg font-semibold fredoka">Estado: <span className={`font-normal ${character.status === "Alive" ? "text-green-500" : "text-red-500"}`}>{character.status || "Estado no disponible"}</span></p>
                                    <p className="text-lg font-semibold fredoka">Ocupación: <span className="font-normal">{character.occupation || "Ocupación no disponible"}</span></p>
                                    <p className="text-lg font-semibold fredoka">Género: <span className="font-normal">{character.gender || "Género no disponible"}</span></p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col gap-6 md:flex-row">
                                <div className="md:w-1/2">
                                   <p className="text-lg font-semibold fredoka">Frases:</p>
                                    {character.phrases && character.phrases.length > 0 ? (
                                        <ul className="list-disc list-inside mt-2 bg-amber-50 p-4 rounded-lg shadow-md shadow-[#FDD835]/50 hover:shadow-[0_0_25px_rgba(253,216,53,0.6)]">
                                            {character.phrases.map((phrase, index) => (
                                                <li key={index} className="text-lg fredoka text-[#FDD835]">
                                                    "{phrase}"
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-lg fredoka">No hay frases disponibles para este personaje.</p>
                                    )} 
                                </div>
                                <div className="md:w-1/2 ">
                                    <p className="text-lg font-semibold fredoka mt-4">Descripción:</p>
                                    <p className="text-lg fredoka bg-amber-50 p-4 rounded-lg shadow-md shadow-[#FDD835]/50 hover:shadow-[0_0_25px_rgba(253,216,53,0.6)]">{character.description || "Descripción no disponible"}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-lg font-semibold fredoka">Primera aparición:</p>
                                <div className="flex flex-col gap-2 mt-2 bg-amber-50 p-4 rounded-lg shadow-md shadow-[#FDD835]/50 hover:shadow-[0_0_25px_rgba(253,216,53,0.6)]">
                                    <p className="text-lg fredoka font-semibold">Episodio: <span className="font-normal">{character.first_appearance_ep?.name || "Episodio no disponible"}</span></p>
                                    <p className="text-lg fredoka font-semibold">Temporada: <span className="font-normal">{character.first_appearance_ep?.season || "Temporada no disponible"}</span></p>
                                    <p className="text-lg fredoka font-semibold">Número de episodio: <span className="font-normal">{character.first_appearance_ep?.episode_number || "Número de episodio no disponible"}</span></p>
                                    <p className="text-lg fredoka font-semibold">Fecha de estreno: <span className="font-normal">{character.first_appearance_ep?.airdate || "Fecha de estreno no disponible"}</span></p>
                                    <p className="text-lg fredoka font-semibold">Descripción del episodio: <span className="font-normal">{character.first_appearance_ep?.description || "Resumen no disponible"}</span></p>
                                    <img src={`${IMAGE_BASE_URL}${character.first_appearance_ep?.image_path}`} alt={character.first_appearance_ep?.name} className="w-64 h-64 rounded-lg shadow-lg mt-4 mx-auto" />
                                </div>
                            </div>
                        </section>
                    )}
                </section>
                
            </main>
        </div>
    )
}

export default InfoPersonaje;