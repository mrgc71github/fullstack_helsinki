import { useState } from 'react'
import Course from './components/Course.jsx'

function App(props) {
  const {courses} = props

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}


export default App
