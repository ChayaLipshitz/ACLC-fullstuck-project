import TeacherCourse from './teacherCourse';
import Details from './details'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { pdfjs } from "react-pdf";
import SignOut from './signOut';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Teacher() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const [courses, setCourses] = useState([]);
    
    let counter = 0;
    async function getCourses() {
        try {
            let data = await fetch(`http://localhost:8080/api/courses/teachers/${user.id}`, { method: 'GET' })
            data = await data.json();
            console.log(data);
            setCourses(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>            
            <h1>Hello  </h1><Details user={user}/>
            {courses.length>0 && <div>your courses:</div>}
            {courses.length>0 && courses.map(item => { return <NavLink activeclassname="active" key={counter++} className="nav-link" exact="true" to={`/teacher/${item.courseName}`} ><h3>{item.courseName}</h3></NavLink> })}
            <Routes>
                {courses.map(item => { return <Route exact="true" key={counter++} element={<TeacherCourse course={item} />} path={`/${item.courseName}`} /> })}
            </Routes>

            {!courses.length && <h3>You don't teach any courses yet!!</h3>}
            <SignOut/>
            {/* {status && <h4>{status}</h4>} */}
        </>
    )
}