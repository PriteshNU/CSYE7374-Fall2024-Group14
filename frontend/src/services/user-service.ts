import * as commonService from './common-service';
import User from '../models/UserModel';
import * as baseService from './base-service';
import Course from '../models/Course';import { userDetailsPath } from '../resources/paths';
const localhost='http://localhost:4000'
const userPath = '/user';

// interface structre defining the json response used to parse the json and get values
interface CourseProgress {  
    courseProgress: {
      [key: string]: number;
    };
  }
// all the APIs related to the user entity
export const getUser = async (): Promise<User> => {
    try {
        const user = await commonService.commonGETOne<User>(userDetailsPath);
        return user;
    } catch (error) {
        throw new Error('Error fetching user data: ' + error);
    }
};
 

export const getRegisteredCourses=async (): Promise<Course[]> => {
    try {
        const registeredCourses= await baseService.GetOne<{myCourses:[]}>(userPath+'/registeredCourses');
        const result= registeredCourses.myCourses;
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching user data: ' + error);
    }
}

export const registerforCourse=async (payload:string,userId:string) => {
    try {
        const enrolledCourse= await baseService.post(userPath+'/registeredCourses'+'/'+userId,payload,'');
        return enrolledCourse;
    } catch (error) {
        console.log(error);
    }
}

export const checkRegistration = async (courseId: string):Promise<{registered:boolean}>=> {
    try {
      const response = await fetch(localhost+userPath +'/registeredCourses'+'/'+courseId, {
        headers: {
            'Content-Type': 'application/json',
          },
        method: 'GET',
        credentials: 'include',
    })
    const data:{registered:boolean}=await response.json();
    
      return data;
    } catch (error) {
      console.error('Error in checkRegistration:', error);
      throw error;
    }
  };

export const updateCourseProgress=async(payload:string)=>{
    try {
        const response : Response = await baseService.post(userPath+'/courseProgress',payload,'');
        return response;
    } catch (error) {
        
    }
}

export const getCourseModuleProgress=async(courseid:string)=>{
    try {
        const response:CourseProgress= await baseService.getDatafromPayload(userPath+`/courseProgress/${courseid}`);
         
        const courseId = courseid; // Replace with the actual courseId
        const courseProgressValue = response.courseProgress[courseId];
        console.log("data:"+courseProgressValue);
        const progress = courseProgressValue;
        return progress;
    } catch (error) {
        console.log(error);
    }
}

