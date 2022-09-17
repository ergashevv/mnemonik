import React, { useContext, useEffect, useState } from 'react';
const HomeContext = React.createContext(false)

export const HomeContextProvider = ({ children }) => {

    const [cursorW, setCursorW] = useState(JSON.parse(localStorage.getItem("cursorW")), 1)
    console.log(cursorW, 'cw');
    const value = {
        cursorW, setCursorW,
    }
    useEffect(() => {
        if (cursorW) {
            localStorage.setItem("cursorW", JSON.stringify(cursorW))
        }
    }, [cursorW])
    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
}

export const useHomeContext = () => useContext(HomeContext)