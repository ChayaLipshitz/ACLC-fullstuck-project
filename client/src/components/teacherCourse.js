


// import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import TeacherCourseStudents from './teacherCourseStudent';

export default function TeacherCourse(props) {
    const course = props.course;
    const [students, setStudents] = useState([])
    let counter = 0;
    async function getStudents() {
        try {
            let data = await fetch(`http://localhost:8080/api/courses/teachers/studentList/${course.courseId}`, { method: 'GET' })
            data = await data.json();
            console.log(data);
            setStudents(data);
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getStudents();
    }, []);
    return (
        <>
            <h2>you now in course {course.courseName}</h2>
            {students.map(item => { return <TeacherCourseStudents student={item} key={counter++} course={course.courseId} /> })}
        </>
    )
}