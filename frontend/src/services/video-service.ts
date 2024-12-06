import * as baseService from './base-service';

const videoBaseurl='/video/';
// api endpoint for rendering the video file
export const getVideo= async (id:string) : Promise<string>=>{
    try {
        const video: string= await baseService.GetOne(videoBaseurl+id)
        return video;
    } catch (error) {
        throw new Error("Error fetching data")
    }
}