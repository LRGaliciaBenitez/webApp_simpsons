import Header from "../components/Header";
import MenuLateral from "../components/MenuLateral";
import Search from "../components/Search";
import { useMenu } from "../hooks/useMenu";
import { useSearch } from "../hooks/useSearch";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

function Contacto () {
    const [isOpen, setIsOpen] = useMenu();
    const [searchOpen, setSearchOpen] = useSearch();

    const form = useRef();

    const cleanForm = () => {
        if (form.current) {
            form.current.reset();
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                alert("Correo enviado correctamente"),
                cleanForm()
            )
            .catch((error) => {
                console.error("Error al enviar el correo:", error);
                alert("Error al enviar el correo. Por favor, inténtalo de nuevo.");
            }
            );
    };

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

                <form 
                    ref={form}
                    onSubmit={sendEmail}
                    className="flex flex-col gap-4 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md shadow-[#FDD835]/50 hover:shadow-[0_0_25px_rgba(253,216,53,0.6)]"
                >
                    <h1 className="text-4xl font-bold text-center mb-6 luckiest text-[#FDD835]">Contacto</h1>
                    <label 
                        htmlFor="nombre"
                        className="text-lg font-semibold fredoka"
                    >
                    Nombre:
                    </label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        className="border border-gray-300 rounded-lg p-2" 
                        placeholder="Tu nombre" 
                    />
                    <label 
                        htmlFor="email" 
                        className="text-lg font-semibold fredoka"
                    >
                    Correo electrónico:
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="border border-gray-300 rounded-lg p-2" 
                        placeholder="Tu correo electrónico" 
                    />
                    <label 
                        htmlFor="mensaje" 
                        className="text-lg font-semibold fredoka"
                    >
                    Mensaje:
                    </label>
                    <textarea 
                        id="mensaje" 
                        name="mensaje" 
                        className="border border-gray-300 rounded-lg p-2" 
                        placeholder="Tu mensaje" 
                        rows="4"
                    ></textarea>
                    <button type="submit" className="bg-[#FDD835] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#FBC02D] transition">
                        Enviar
                    </button>
                </form>

            </main>
        </div>
    )
}

export default Contacto;