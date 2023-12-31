// import { Routes, Route, Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { useEffect, useState, File } from 'react';
// import { NavLink } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf";
import SingleCourse from './singleCourse'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MyCourses(props) {
    const user = props.user;
    let counter = 0;
    const [Courses, setCourses] = useState([]);

    async function getCourses() {
        try {
            let data = await fetch(`http://localhost:8080/api/courses/students/${user.id}`, { method: 'GET' })
            data = await data.json();
            console.log("data", data)
            setCourses(data);
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getCourses();
    }, [])


    return (
        <>
            <h1>Your courses:</h1>
            {Courses.map((_course) => {
                return (
                    <div key={counter++}>
                        <hr/>
                        <SingleCourse  user={user} course={_course} />
                    </div>
                )
            })}
            <hr />
        </>
    )
}