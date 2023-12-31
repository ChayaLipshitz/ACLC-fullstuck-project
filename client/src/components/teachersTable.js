import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
import SignUp from './signUp';

export default function TeachersTable(props) {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    let counter = 0;

    let getTeachers = async () => {
        let m_data = await fetch('http://localhost:8080/api/teachers', { method: 'GET' })
        m_data = await m_data.json()
        setCourses(m_data.courses)
        // props.courses(m_data.courses)
        setTeachers(m_data.teachers)
        console.log("m_data", m_data);
    }
    useEffect(() => { getTeachers() }, [])


    // let addTeacher = () => {
    //     navigate('/signUp')
    // }

    let deleteTeacher = async (id) => {
        console.log(id);
        let res = await fetch(`http://localhost:8080/api/teachers/${id}`, { method: 'DELETE' })
        await res.json()
        getTeachers()
    }


    return (
        <>
            <h4>teachers</h4>
            <table>
                <thead>
                    <tr >
                        <th>id</th>
                        <th>last name</th>
                        <th>first name</th>
                        <th>courses</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(item =>

                        <tr key={counter++}>
                            <td>{item.id}</td>
                            <td>{item.lastName}</td>
                            <td>{item.firstName}</td>
                            {courses&&courses.map(it => it.teacherId === item.id && <td key={counter++}>{it.courseName}</td>) }
                            <td><button name="deleteBtn" onClick={() => deleteTeacher(item.id)}>🗑</button></td>
                        </tr>
                    )}
                </tbody>
            </table>

            
            {/* <button className="btn" name="+button" onClick={() => { addTeacher() }}>+</button> */}
        </>
    )
}