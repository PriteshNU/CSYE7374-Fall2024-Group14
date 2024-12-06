interface Course{
    _id: string
    title: string,
    instructor: string,
    duration: string,
    fees: number,
    category: string,
    subCategory: string,
    thumbnail: string,
    description: string,
    noOfModules: number,
    creationTime: string,
    avg_star_rating: number
    moduleIDs: Array<any>
}

export default Course