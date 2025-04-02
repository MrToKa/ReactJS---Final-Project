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

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };

        const logout = async () => {
            const response = await fetch(`${baseUrl}/logout`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            userLogoutHandler();
        }

        logout();

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    };
};

export const useRegister = () => {
    const register = async (userEmail, password) => {
        const result = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail, password }),
        });
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        // Assuming result contains user data
        const { email, username, _id } = result;
        const user = { email, username, _id };

        return user;
    };
    
    return {
        register,
    }
};