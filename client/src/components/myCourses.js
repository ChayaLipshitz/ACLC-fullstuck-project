import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, File } from 'react';
import { NavLink } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf";
import SingleCourse from './singleCourse'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MyCourses(props) {
    const user = props.user;
    let counter = 0;
    const [Courses, setCourses] = useState([]);
    const [m_file, setFile] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const [numPages, setNumPages] = useState(null);
    
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

    const handleSubmit = async (e) => {
        console.log(e.target[0].className);
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', m_file.data);
        const fileDetails = {
            "studentId": user.id,
            "courseId": e.target[0].className,
            "url": m_file.data.name
        }
        console.log("formData", formData);
        const response1 = await fetch('http://localhost:8080/api/assignments/file', {
            method: 'POST',
            body: formData, //formData,
            mode: 'cors',
            boundary:"MyBoundary",
          
        })
        const response2 = await fetch('http://localhost:8080/api/assignments/details', {
            method: 'POST',
            body: JSON.stringify(fileDetails),
            mode: 'cors',
            boundary:"MyBoundary",
            headers: {
                'Content-Type': 'application/json',
              
            },
        })
        if (response1&response2) setStatus(response1.statusText);
    }


    const handleFileChange = (e) => {
        debugger
        console.log(e);
        const file = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee",e);
        // String fileName = e.name;
        setFile(file)
    }


    useEffect(() => {
        getCourses();
    }, [])


    return (
        <>
            <h1>courses</h1>
            {Courses.map((item , index)=> {
                return (
                    <SingleCourse key = {counter++} user = {user} item = {item}/>

                )
            })}
        </>
    )
}