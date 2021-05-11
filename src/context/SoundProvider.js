import React,{ createContext,useContext,useReducer } from "react";

export const SoundProviderContext=createContext()

export const SoundProvider = ({initialState,reducer,children}) => (
    <SoundProviderContext.Provider value={useReducer(reducer,initialState)}>
            {children}
    </SoundProviderContext.Provider>
)

export const useSoundProviderValue = () => useContext(SoundProviderContext);