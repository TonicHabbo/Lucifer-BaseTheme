import { useBetween } from 'use-between';
import { useApi } from './useApi';

const useAuthState = () =>
{
    const { setToken, post } = useApi();

    const login = async (username: string, password: string) => 
    {
        let result = await post<{ token?:string, errors:string[] }>('auth/login',{ username,password });

        setToken(result.token);

        return result;
    }

    return { login };
}

export const useAuthentication = () => useBetween(useAuthState);