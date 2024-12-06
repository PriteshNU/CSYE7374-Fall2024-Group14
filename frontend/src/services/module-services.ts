import Modules from '../models/modules'
import * as baseServices from './base-service';


const modulesResourcePath='/modules';
// All the module related endpoints  

export const search = async():Promise<Modules[]>=>{
    const courses = await baseServices.search<Modules>(modulesResourcePath,{});
    return courses;
}

export const getModules=async (id:string) : Promise<Modules[]>=> {
    const modules = await baseServices.GET<Modules>(modulesResourcePath+'/course/'+id);
    return modules;
}

export const AddModule=async (payload:string): Promise<Response> => {
    const response = await baseServices.post(modulesResourcePath,payload,'');
    return response;
}

export const uploadModuleVideo=async(payload:FormData) : Promise<Response> =>{
    const response= await baseServices.postData("/video",+payload,'');
    return response;
}