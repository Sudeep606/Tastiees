import { createContext, useEffect, useState } from "react";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
    const [favs, setFavs] = useState(() => {
        try {
            const storedFavs = localStorage.getItem('favs');
            return storedFavs ? JSON.parse(storedFavs) : [];
        } catch (error) {
            console.error("Error parsing fav items:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favs));
    }, [favs]);

    const addToFav = (item) => {
        console.log("Current favItems:", favs);

        if (!Array.isArray(favs)) {
            console.error("favs is not an array");
            return;
        }

        const existingItem = favs.find(favItem => favItem._id === item._id);
        if (existingItem) {
            setFavs(favs.map(favItem =>
                favItem._id === item._id ? { ...favItem, quantity: (favItem.quantity || 1) + 1 } : favItem
            ));
        } else {
            setFavs([...favs, { ...item, quantity: 1 }]);
        }
    };

    return (
        <FavContext.Provider value={{ favs, addToFav }}>
            {children}
        </FavContext.Provider>
    );
};
