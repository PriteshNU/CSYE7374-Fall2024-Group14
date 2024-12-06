const baseURL = 'http://localhost:4000';
// The generic type of API defined for fetching data from the server
export const GET = async <T>(path: string) : Promise<T[]> =>{
    try {
        const response = await fetch(baseURL+path,{
            method: 'GET',
            credentials:'include'
        })
    
        const data: T[] = await response.json();
    
        return data;
    } catch (error) {
        throw new Error("API failed");
    }
}

export const GetOne = async <T>(path: string): Promise<T> => {
    try {
        const response = await fetch(baseURL + path, {
            method: 'GET',
            credentials: 'include',
        })
    
        const data: T = await response.json();
        return data;
    } catch (error) {
        throw new Error("API failed");
    }
   
}

export const getDatafromPayload=async <T>(path:string) : Promise<T> => {
    try {
        const response = await fetch(baseURL + path, {
            method: 'GET',
            credentials: 'include',
            
        })
    
        const data: T = await response.json();
        return data;
    } catch (error) {
        throw new Error("API failed");
    }
    
}

export const search = async<T>(path: string, params: any):Promise<T[]>=>{
    try {
    const query: URLSearchParams=new URLSearchParams(params);
    const response = await fetch(baseURL+path+query,{
        method:'GET'
    })
    const data:T[]=await response.json();
    return data;
    } catch (error) {
        throw new Error("API failed");
    }
    
}

export const post=async<T>(path:string,payload:any,params:any): Promise<Response> =>{
    const query: URLSearchParams=new URLSearchParams(params);
    try {
        const response = await fetch(baseURL+path+query,{
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
              },
              body: payload
        })
        const data=await response;
        return data;
        
    } catch (error) {
        throw new Error("API failed");
        
    }
    
}

export const postData=async<T>(path:string,payload:any,params:any):Promise<Response> =>{
    try {
        const query: URLSearchParams=new URLSearchParams(params);
    const response=await fetch(baseURL+path+query,{
        method:'POST',
        body:payload
    })
    const data=await response;
    return data;
    } catch (error) {
        throw new Error("API failed");
    }
    
}