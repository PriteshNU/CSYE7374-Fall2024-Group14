import React from 'react'
import Course from '../models/Course'
import CourseCard from './CourseCard'

type Props = {
    courses: Course[]
}

const CoursesGrid = ({courses}:Props) => {
  return (
    <div>
        <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-2 bg-zinc-100 h-full">
          {courses.map((courseItem) => (
            <div className="m-2"><CourseCard course={courseItem} /></div>
          ))}
        </div>
    </div>
  )
}

export default CoursesGrid