import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const login = async (userEmail, password)  => {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail, password }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const { email, username, _id, accessToken } = result;
        const user = { email, username, _id, accessToken };
        const token = accessToken;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return user; // Return the parsed user object
    };

    return { 
        login,
    };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const logout = async () => {
            if (!accessToken) {
                console.error("Logout failed: Missing access token"); // Log missing token
                return;
            }
            
            const options = {
                method: 'GET', // Use GET as required by the API
                headers: {
                    'X-Authorization': accessToken,
                }
            };

            try {
                const response = await fetch(`${baseUrl}/logout`, options);
                if (response.status !== 204) { 
                    console.error(`Logout failed: HTTP status ${response.status}`); 
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                userLogoutHandler();
            } catch (error) {
                console.error("Logout error:", error); 
                throw error;
            }
        };

        logout();

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    };
};

export const useRegister = () => {
    const { accessToken } = useContext(UserContext);

    const register = async ({ email, password }) => { // Accept an object with email and password
        const result = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify({ email, password }), // Send email and password in the request body
        });
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const responseData = await result.json(); // Parse the response JSON
        const { email: userEmail, username, _id } = responseData; // Extract user data
        const user = { email: userEmail, username, _id };

        return user;
    };
    
    return {
        register,
    }
};