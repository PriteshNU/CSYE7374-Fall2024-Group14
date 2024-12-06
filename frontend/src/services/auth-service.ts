import * as baseService from './base-service';
import User from '../models/UserModel'
import Instructor from '../models/Instructor';

const authPath='/auth';
// The service used for login logout for user and instructor entities
export const registerUser =async (payload:string): Promise<Response> => {
    const newUser= baseService.post<User>(authPath+'/user/register',payload,'');
    return newUser;
}

export const loginUser = async (payload: any):Promise<Response>=>{
    try {
        const existingUser=baseService.post<User>(authPath+'/user/login',payload,'');
    return existingUser;
    } catch (error) {
        throw new Error("Login Failed");
        
    }
    
}

export const registerInstructor =async (payload:any):Promise<Response> => {
    const newUser= baseService.post<Instructor>(authPath+'/instructor/register',payload,'');
    return newUser;
}

export const loginInstructor = async (payload: any):Promise<Response>=>{
    try {
        const existingUser=baseService.post<Instructor>(authPath+'/instructor/login',payload,'');
    return existingUser;
    } catch (error) {
        throw new Error("Login Error");
        
    }
    
}

export const logout= async(): Promise<Response> =>{
    const logoutUser: Response = await baseService.GetOne(authPath+'/logout');
    return logoutUser;
}