import * as baseService from './base-service';
import Course from '../models/Course';

const coursePath= '/courses';
// All the course entity specific endpoint api calls
export const getCourses =async () : Promise<Course[]> => {
    const courses= baseService.GET<Course>(coursePath);
    return courses;
}

export const postCourses = async (payload:Course) =>{
    const newCourse= baseService.post<Course>(coursePath,payload,'')
    return newCourse;
}

export const addInstructorCourses=async (payload:string): Promise<Response> => {
    const addCourse= baseService.post(coursePath,payload,"");
    return addCourse;
    
}