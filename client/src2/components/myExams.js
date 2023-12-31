import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'


export default function MyExams(props) {
    console.log(props);
    const user = props.user;
    let counter = 0;
    const [grades, setGrades] = useState([]);
    async function getGrades() {
        try {
            let data = await fetch(`http://localhost:8080/api/grades/students/${user.id}`, { method: 'GET' })
            data = await data.json();
            console.log(data)
            setGrades(data);
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getGrades();
    }, [])


    return (
        <>
            <h1>exams</h1>
            {grades.map(item => {
                return (
                    <div key={counter++}>
                        <h2>{item.courseName}</h2>
                        <h3>your grade: {item.grade}</h3>
                        <h4>passing grade: {item.passingGrade}</h4>
                    </div>
                )
            })}
        </>
    )
}