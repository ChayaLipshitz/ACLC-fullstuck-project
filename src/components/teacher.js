import TeacherCourse from './teacherCourse';
import Details from './details'
import { Routes, Route } from 'react-router-dom'
import { useRef, useEffect, useState, File } from 'react';
import { NavLink } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf";
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


    // state = {
    //     numPages: null,
    //     pageNumber: 1,
    // }

    // onDocumentLoadSuccess = ({ numPages }) => {
    //     this.setState({ numPages });
    // }





    




    return (
        <>
            <Details user={user} />
            <h1>Hello {user.lastName} {user.firstName}</h1>
            {courses.map(item => { return <NavLink activeclassname="active" key={counter++} className="nav-link" exact="true" to={`/teacher/${item.courseName}`} >{item.courseName}</NavLink> })}
            <Routes>
                {courses.map(item => { return <Route exact="true" key={counter++} element={<TeacherCourse course={item} />} path={`/${item.courseName}`} /> })}
            </Routes>
            
            {/* {status && <h4>{status}</h4>} */}



        </>
    )
}