import React from 'react'
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext

