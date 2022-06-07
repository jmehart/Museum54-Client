import React, {createContext, useState, useEffect} from 'react';
import { getCurrentUser } from './components/users/UserManager';



export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setUser] = useState({})

    useEffect(() => {
        getCurrentUser()
        .then(data => setUser(data))
    },[])

    return (
        <UserContext.Provider value={{currentUser, setUser}}>
            {children}
        </UserContext.Provider>
    )



}