import * as commonService from './common-service';
import * as BaseService from './base-service';
import Instructor from '../models/Instructor';
import Course from '../models/Course';

const instructorPath = '/instructor/current';
const instructorCoursePath='/instructor/mycourses';
const instPath='/instructor';

// All the instructor entity related api call endpoints

interface instructorCourses{
    courses:Course[]
}

export const getInstructors = async () : Promise<Instructor> => {
    const instructor = commonService.commonGETOne<Instructor>(instructorPath);
    console.log(instructor);
    return instructor;
}

export const getInstructorCourses=async () =>{
    const response: instructorCourses= await BaseService.GetOne(instructorCoursePath);
    const instCourses= response.courses
    return instCourses;
}

export const addCoursetoInstructor=async(payload:string)=>{
    const response= await BaseService.post(instructorCoursePath+"/"+payload,'','');
    return response;
}

export const saveInstructorDetails=async(payload:string)=>{
    const respose = await BaseService.post(instPath,payload,"");
    return respose;
}