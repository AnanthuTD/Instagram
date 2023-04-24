'use client'
import { createContext, useState, useContext } from "react";

interface OverflowContext {
    overflowHidden: boolean;
    setOverflowHidden: (overflowHidden: boolean) => void;
}

const defaultContext: OverflowContext = {
    overflowHidden: false,
    setOverflowHidden: () => {},
};

export const OverflowContext = createContext(defaultContext);

export const useOverflowContext = () => useContext(OverflowContext);

export default function OverflowProvider({ children }:any) {
    const [overflowHidden, setOverflowHidden] = useState(false);

    const value: OverflowContext = {
        overflowHidden,
        setOverflowHidden,
    };

    return (
        <OverflowContext.Provider value={value}>
            {children}
        </OverflowContext.Provider>
    );
}
