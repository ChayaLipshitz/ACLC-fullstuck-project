import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import SignOut from './signOut';

export default function StudentTask(props) {
    const user = props.user;
    let href = window.location.href.split('/')
    let fullCourse = href[href.length - 2]
    const taskNumber = href[href.length - 1]
    let courseId = fullCourse.slice(0, fullCourse.length - 6)
    console.log("coursetask for course", courseId);
    let counter = 0;
    const course = props.course
    const [toShow, setToShow] = useState(false)
    const [showHide, setToShowHide] = useState("to show")
    const [m_file, setFile] = useState({ preview: '', data: '' })
    // const [taskNumber, setTask] = useState(1);
    const [fileName, setFileName] = useState("");
    useEffect(() => {
    }, []);


    const handleSubmit = async (e) => {
        console.log("in submit", e);
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
                "taskNumber": taskNumber
            }
            console.log("course id", e.target[0].className);
            const response1 = await fetch('http://localhost:8080/api/assignments/file', {
                method: 'POST',
                body: formData, //formData,
                mode: 'cors',
                boundary: "MyBoundary",
            })
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
        console.log("in file change", e);

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
    return (
        <div className="task">
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
                        className={`${courseId}`}
                        onChange={handleFileChange} ></input>
                    <label id='labelToFile' htmlFor="file">Upload your task</label>
                    <a href={m_file.preview} target="_blank">{fileName}</a>
                </div>
                <button placeholder="choose-file" type='submit'>Submit</button>
            </form>

        </div>
    );
}
