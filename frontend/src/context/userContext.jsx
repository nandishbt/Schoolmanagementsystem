import { createContext, useState } from "react";

export const userContext = createContext(null)

const UserContextProvider = ({children}) =>{
    const [rollno, setRollno] = useState(1002) 
    const [email, setEmail] = useState('bhagya@gmail.com')

    

    return (
        <userContext.Provider value={{rollno,email,setRollno,setEmail}}>
            {children}
        </userContext.Provider>
    )

}

export default UserContextProvider;