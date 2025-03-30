import UserService from '../../services/userServise';

export const useLogin = () => {
    const login = async (email, password)  => {
        const result = await UserService.login(email, password);

        if (result.error) {
            throw new Error(result.error);
        }
        // Assuming result contains user data
        const user = result.data;
        const token = result.token;
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