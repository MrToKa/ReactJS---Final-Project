import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

import userService from "../../services/userService";

export const useLogin = () => {
    const login = async (userEmail, password)  => {
        const result = await userService.login(userEmail, password);

        if (result.error) {
            throw new Error(result.error);
        }
        const { email, username, _id, accessToken } = result;
        const user = { email, username, _id, accessToken };
        const token = accessToken;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return user;
    };

    return { 
        login,
     };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    console.log('accessToken', accessToken);

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
        const { email, username, _id } = result;
        const user = { email, username, _id };

        return user;
    };
    
    return {
        register,
    }
};