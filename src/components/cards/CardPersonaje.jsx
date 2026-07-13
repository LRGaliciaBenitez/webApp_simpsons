

function CardPersonaje( { personaje, onClick } ) {

    const IMAGE_BASE_URL = "https://cdn.thesimpsonsapi.com/500";

    return (
        <div 
        className="group relative transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(253,216,53,0.6)] shadow-lg bg-white text-black w-full py-4 px-6 h-75 flex flex-col items-center rounded-lg cursor-pointer "
        onClick={onClick}
        >
            <img src={`${IMAGE_BASE_URL}${personaje.portrait_path}`} alt={personaje.name} className="w-25 h-30 transition object-contain duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(253,216,53,0.8)]" />
            <div className="mt-5 gap-2 flex flex-col">
                <h2 className="text-lg text-center font-bold fredoka group-hover:text-[#FDD835]">{personaje.name || "Nombre no disponible"}</h2>
                <p className="text-sm fredoka text-center group-hover:text-[#FDD835]/80">{personaje.age || "Edad no disponible"}</p>
                <p className={`${personaje.status === "Alive" ? "text-green-500" : "text-red-500"} text-sm fredoka text-center group-hover:text-[#FDD835]/80`}> {personaje.status || "Estado no disponible"}</p>
            </div>
        </div>
    )
}


export default CardPersonaje;