import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

import userService from "../../services/userService";

export const useLogin = () => {
    const login = async (userEmail, password)  => {
        const result = await userService.login(userEmail, password);
        console.log('result', result);

        if (result.error) {
            throw new Error(result.error);
        }
        // Assuming result contains user data
        const { email, username, _id, accessToken } = result;
        const user = { email, username, _id };
        const token = accessToken;

        console.log('user', user);
        console.log('token', token);

        // Store user data and token in local storage or context
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        // Return user data for further use
        return user;
    };

    return { 
        login,
     };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    console.log('accessToken', accessToken);
    console.log('userLogoutHandler', userLogoutHandler);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };

        userService.logout(options)
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                userLogoutHandler();
            });

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    };
};

export const useRegister = () => {
    const register = async (userEmail, password) => {
        const result = await userService.register(userEmail, password);

        if (result.error) {
            throw new Error(result.error);
        }
        // Assuming result contains user data
        const { email, username, _id, accessToken } = result;
        const user = { email, username, _id };
        const token = accessToken;
        // Store user data and token in local storage or context
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        // Return user data for further use
        return user;
    };
    
    return {
        register,
    }
};