import { useContext, useState, createContext } from "react";

export const AppContext = createContext();
export default function AppProvider({children}) {
    const [user, setUser] = useState();
    const isUserAuthenticated = () => !!user;

    return (
        <AppContext.Provider value={{
            
        }}>
            {children}
        </AppContext.Provider>
    )
}
