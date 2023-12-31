import { useEffect, useState } from 'react';
import React from 'react'
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//import "../node_modules/bootstrap/dist/css/bootstrap.css";


export default function TeacherCourseStudents(props) {
    let student = props.student;
    student.course = props.course;
    const [onUpdate, setUpdate] = useState(true);
    const [assignments, setAssignments] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [m_file, setFile] = useState({ preview: '', data: '' })


    let counter = 0;

    useEffect(() => {

    }, [])
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setUpdate(true)
            updateGrade(parseInt(event.target.value));
        }
    }

    // function openModal() {
    //     /* DESCRIPTION: Open the w   arning modal */
    //     let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    //     myModal.show();
    // }

    let getAssignments = () => {
        //    let assignments = await fetch()
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
        const result = await req.json();
        console.log(result)
    }
    return (
        <>
            <h3>name: {student.studentFirstName} {student.studentLastName}</h3>
            <h3>grade:  </h3>
            {onUpdate && <button onClick={() => setUpdate(false)}>{student.grade || "enter grade"}</button>}
            {!onUpdate && <input placeholder={student.grade} type="number" onKeyDown={handleKeyDown} />}
            {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Document file={m_file.preview} width='100' height='100' onLoadError={console.error} onLoadSuccess={({ numPages }) => { setNumPages(numPages) }}>
                                {Array.apply(null, Array(numPages))
                                    .map((x, i) => i + 1)
                                    .map(page => <Page key={counter++} pageNumber={page} />)}
                            </Document>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}