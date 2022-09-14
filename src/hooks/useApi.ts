import { useState } from 'react';
import { useBetween } from 'use-between';

const useApiState = () =>
{
    const [ token, setToken ] = useState(localStorage.getItem('auth-token')?.toString() || '');

    async function get<T>(url: string): Promise<T>
    {
        //@ts-ignore
        let prepend = LuciferConfig.url;

        let res = await fetch(prepend + url, {
            'headers': {
                'auth-token': token
            }
        });

        let json = await res.json();

        return json as T;
    }

    async function post<T>(url: string, options: any): Promise<T>
    {
        //@ts-ignore
        let prepend = LuciferConfig.url;
        let res = await fetch(prepend + url, {
            method: 'POST',
            headers: {
                'auth-token': token
            },
            body: JSON.stringify(options)
        });

        let json = await res.json();

        return json as T;
    }

    return { get,post, setToken };
}

export const useApi = () => useBetween(useApiState);