// import { Routes, Route, Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
// import { NavLink } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf";
import './singleCourse.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SingleCourse(props) {
    const user = props.user;
    let counter = 0;
    const course = props.course
    const [toShow, setToShow] = useState(false)
    const [showHide, setToShowHide] = useState("to show")
    const [m_file, setFile] = useState({ preview: '', data: '' })
    const [numPages, setNumPages] = useState(null);
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
                "assignmet_num": e.target.assignmet_num.value
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
        // String fileName = e.name;
        setFile(file)
    }

    return (
        <div key={props.key}>

            <h2><b>{course.courseName} course</b></h2>
            {/* <h3>passing grade: {course.passingGrade}</h3> */}
            <h3>Teacher: {course.teacherFirstName} {course.teacherLastName}</h3>
            {/* <h2>Upload your task -</h2> */}
            {/* {m_file.preview &&
                <button onClick={() => {
                    setToShow(!toShow);
                    setToShowHide(showHide === "to show" ? "to hide" : "to show")
                }}>{showHide}</button>} */}
            {/* {m_file.preview && toShow &&
                <Document
                    file={m_file.preview}
                    width='100'
                    height='100'
                    onLoadError={console.error}
                    onLoadSuccess={({ numPages }) => { setNumPages(numPages) }} >
                    {Array.apply(null, Array(numPages))
                        .map((x, i) => i + 1)
                        .map(page => <Page key={counter++} pageNumber={page} />)}
                </Document>} */}

            <form onSubmit={handleSubmit}>
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
                </div>
                <select name="assignmet_num" >
                    {[...new Array(9).keys()].map(item => { return <option key={item + 1} value={`${item + 1}`}>{`task ${item + 1}`}</option> })}
                    {/* {["task 1", "task 2", "task 3", "task 4", "task 5", "task 6", "task 7", "task 8", "task 9"].map(item => { return <option key={item} value={`${item}`}>{item}</option> })} */}
                </select>
                <button placeholder="choose-file" type='submit'>Submit</button>

            </form>
        </div>
    )
}