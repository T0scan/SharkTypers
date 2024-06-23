import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {

    const [username, setUsername] = useState("Guest");
    const [cookie, hasCookie] = useState(false)

    useEffect(() => {

        const checkCookie = () => {
            if (document.cookie) {
                loginStatus();
            } else {
                hasCookie(false)
            }
        }

        checkCookie();
        console.log('coooke monster set')
    }, [])

    function cookieToken() {
        const splitTokenStart = document.cookie.split("token=");
        const splitTokenEnd = splitTokenStart[1].split(";");
        //returns the token after all the string manipulation >.>
        return splitTokenEnd[0];
    }

    const loginStatus = async () => {
        try {
            const response = await axios.get('/api/user/protected', {
                headers: {
                    Authorization: `Bearer ${cookieToken()}` // Include the token with "Bearer " prefix
                }
            });
            const { user } = response.data;
            hasCookie(true)
            console.log('runescape 4040 :: ' + cookie)
            setUsername(user)
        } catch (err) {
            console.error(err)
        }
    }

    const values = {
        setUsername,
        username,
        hasCookie,
        cookie
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider