import { useState } from "react";

export const useMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    return [isOpen, setIsOpen];

};