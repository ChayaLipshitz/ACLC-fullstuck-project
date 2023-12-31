// import { Routes, Route, Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
// import { NavLink } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf";
import './singleCourse.css'
import { NavLink, Route, Routes } from 'react-router-dom';
import CourseTasks from './courseTasks';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SingleCourse(props) {
    const user = props.user;
    let counter = 0;
    const course = props.course
    const [toShow, setToShow] = useState(false)
    const [showHide, setToShowHide] = useState("to show")
    const [m_file, setFile] = useState({ preview: '', data: '' })
    const [taskNumber, setTask] = useState(1);
    const [fileName, setFileName] = useState("");

    const handleSubmit = async (e) => {
        setFileName(m_file.data.name ? m_file.data.name : "select file")
        try {
            console.log(e);
            e.preventDefault();
            let formData = new FormData();
            formData.append('file', m_file.data);
            const fileDetails = {
                "studentId": user.id,
                "courseId": e.target[0].className,
                "url": m_file.data.name,
                "assignmet_num": e.target.assignmet_num.value,
                "taskNumber": taskNumber
            }
            console.log("course id", e.target[0].className);
            const response1 = await fetch('http://localhost:8080/api/assignments/file', {
                method: 'POST',
                body: formData, //formData,
                mode: 'cors',
                boundary: "MyBoundary",
                //assignmet_num: e.target.assignmet_num.value
            })
            console.log("e.target:", e.target.assignmet_num.value);
            const response2 = await fetch('http://localhost:8080/api/assignments/details', {
                method: 'POST',
                body: JSON.stringify(fileDetails),
                mode: 'cors',
                boundary: "MyBoundary",
                headers: {
                    'Content-Type': 'application/json',

                },
            })
            if (response1 & response2) console.log(response1.statusText);
        }
        catch (err) {
            console.error(err);
        }
    }


    const handleFileChange = (e) => {
        console.log(e);
        const file = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        setFileName(file.data.name ? file.data.name : "select file")
        console.log('e.target.value.slice(`C:\fakepath`)', e.target.value.slice("C:"));

        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
        setFile(file)
    }

    const handleTaskChanges = (e) => {
        console.log("e.target.value of the select: ", e.target.value);
        setTask(e.target.value)
    }

    return (
        <div key={props.key}>

            <h2><b>{course.courseName} course</b></h2>
            <h3>Teacher: {course.teacherFirstName} {course.teacherLastName}</h3>
            <NavLink activeclassname="active" className="nav-link" exact="true" to={`/student/courses/${course.courseId}-tasks`}> The tasks</NavLink>
            <Routes>
                <Route exact="true" element={<CourseTasks user={user} />} path={`/${course.courseId}-tasks/*`} />{' '}
            </Routes>
            {/* <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='file'
                        name='file'
                        style={{ 'display': 'none' }}
                        placeholder={fileName}
                        id="file"
                        accept=".pdf"
                        aria-label='hj'
                        className={`${course.courseId}`}
                        onChange={handleFileChange} ></input>
                    <label id='labelToFile' htmlFor="file">Upload your task</label>
                    <a href={m_file.preview} target="_blank">{fileName}</a>
                </div> */}

                {/* {[...new Array(9).keys()].map(item => { return <option key={item + 1} value={`${item + 1}`} >{`task ${item + 1}`}</option> })} */}

                {/* <select name="assignment_num" onChange={(e) => handleTaskChanges(e)} >
                    {[...new Array(9).keys()].map(item => { return <option key={item + 1} value={`${item + 1}`} >{`task ${item + 1}`}</option> })}
                </select> */}
                {/* <button placeholder="choose-file" type='submit'>Submit</button>
            </form> */}
        </div>
    )
}