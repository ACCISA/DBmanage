import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState(false)
    const [root, setRoot] = useState(false)

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                if (!data) return;
                console.log(data)
                setUser(data.username)
                setActive(data.active)
                setRoot(data.root)
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, active, setActive }}>
            {children}
        </UserContext.Provider>
    );
}