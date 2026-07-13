import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(1);

    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    }

    const prevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    }

    return { page, nextPage, prevPage };
};