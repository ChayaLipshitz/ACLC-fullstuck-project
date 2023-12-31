import { useEffect, useState } from 'react';
import React from 'react'
import { pdfjs } from "react-pdf";
import Alert from '@mui/material/Alert';
import FileSaver from 'file-saver';

import { Link } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//import "../node_modules/bootstrap/dist/css/bootstrap.css";



export default function TeacherCourseStudents(props) {
    let student = props.student;
    student.course = props.course;
    const [onUpdate, setUpdate] = useState(true);
    const [pdf_url, set_pdf_url] = useState("");
    const [alerts, setAlerts] = useState(<div></div>);
    // const [assignments, setAssignments] = useState([]);
    // const [numPages, setNumPages] = useState(null);
    // const [m_file, setFile] = useState({ preview: '', data: '' })


    // let counter = 0;

    useEffect(() => {
        get_file();
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setUpdate(true) 
            const resultCode = updateGrade(parseInt(event.target.value));
            resultCode.then(code => {
                console.log("the final result", code);
                let alert_message = ""
                if (code === 200) {
                    alert_message = "The grade updated succesfully!!"
                }
                else {
                    alert_message = "Ho no, The grade updated failed!!"
                }
                // Call the setAlerts function to display a success alert.
                setAlerts(<Alert severity="success" onClose={() => {setAlerts(<div></div>)}}>{alert_message}</Alert>)

            }
            )
        }
    }

    // function openModal() {
    //     /* DESCRIPTION: Open the warning modal */
    //     let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    //     myModal.show();
    // }

    // let getAssignments = () => {
    //     //    let assignments = await fetch()
    // }
    let get_file = async () => {
    console.log(student);
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            },
        }
        // console.log(`http://localhost:8080/api/assignments/pdffiles/${student.course}/${student.id}`);
        let req = await fetch(`http://localhost:8080/api/assignments/pdffiles/${student.course}/${student.id}`, request);
        // const result = (await req.json());
        console.log("req of url", req)
        set_pdf_url(req.url)
        // FileSaver.saveAs(
        //     new Blob([req.data], { type: 'application/pdf' }),
        //     `sample.pdf`
        //   );
        // const result = await req.json();
        // console.log("result of url", result);
        // if (result.code == 200)
        //     return 200
        // else { return "error"; }
        // console.log("result of updating:" ,result)
        // return parseInt(result.code)
    }


    let updateGrade = async (grade) => {
        student.grade = grade;
        const request = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(student)
        }
        let req = await fetch(`http://localhost:8080/api/teachers/studentList/grades`, request);
        // const result = (await req.json());
        const result = await req.json();
        console.log("result", result);
        if (result.code == 200)
            return 200
        else { return "error"; }
    }
    return (
        <>
            <h3>Name: {student.studentFirstName} {student.studentLastName}</h3>
            <h3>Grade:  </h3>
            {onUpdate && <button onClick={() => setUpdate(false)}>{student.grade || "Enter grade"}</button>}
            {!onUpdate && <input placeholder={student.grade} type="number" onKeyDown={handleKeyDown} />}
            {alerts}
            <h3>Task: </h3><Link to = {pdf_url} target="_blank" rel="noopener noreferrer">{pdf_url}</Link>
        </>
    )
}