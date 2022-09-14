import { useBetween } from 'use-between';
import { useApi } from './useApi';

const useAuthState = () =>
{
    const { setToken, post } = useApi();

    const login = async (username: string, password: string) => 
    {
        let result = await post<{ sso:string }>('/auth/login',{ username,password });

        if(result) setToken(result.sso);
    }

    return { login };
}

export const useAuthentication = () => useBetween(useAuthState);