import { message } from 'antd';

interface ResponseProd<T> {
    code: Code;
    data: T;
}

interface ResponseDev<T> {
    description: string | string[];
    response: ResponseProd<T>;
    request: {};
}

export enum Code {
    notOpenYet = -2,
    unknownError = -1,
    success = 0,
    checkError = 1,
    getError = 2,
    updateError = 3,
    addError = 4,
    deleteError = 5,
}

const formatUrl = async (url: string, query = {}) => {
    if (!Object.keys(query).length) {
        return url;
    }
    return `${url}?${Object.keys(query).map(key => `${key}=${query[key]}`).join('&')}`;
}

interface Ajax {
    url: string;
    data?: {};
    method?: 'POST' | 'GET' | 'HEAD' | 'PUT' | 'DELETE';
    onError?(): void;
}

export default async <T = any>({ url, data = {}, method = 'GET', onError }: Ajax): Promise<ResponseProd<T>> => {
    const { origin } = window.location;
    const credentials = 'same-origin';
    const headers = {
        'content-type': 'application/json;charset=UTF-8'
    };
    try {
        if (process && process.env.NODE_ENV === 'development') {
            const res = await fetch(`${origin}/api/${url}.${method.toLowerCase()}.json`, {
                credentials,
                headers,
                method: 'GET',
                body: null
            });
            if (!res.ok) {
                throw new Error();
            }
            const json = await res.json() as ResponseDev<T>;
            return json.response;
        } else {
            const isGet = (method === 'HEAD' || method === 'GET');
            const res = await fetch(await formatUrl(`${origin}/api/${url}`, isGet ? data : {}), {
                credentials,
                headers,
                method: method.toUpperCase(),
                body: isGet ? null : JSON.stringify(data)
            });
            if (!res.ok) {
                throw new Error();
            }
            return res.json();
        }
    } catch {
        onError ? onError() : message.error("网络连接超时");
        return new Promise<ResponseProd<T>>(resolve => void 0);
    }
};