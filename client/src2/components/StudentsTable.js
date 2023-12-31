import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function StudentsTable(props) {
    let navigate = useNavigate();

    const user = props.user;
    const [data, setData] = useState([]);
    let counter = 0;

    let getStudents = async () => {
        let m_data = await fetch('http://localhost:8080/api/students', { method: 'GET' })
        m_data = await m_data.json()
        setData(m_data)
        console.log(m_data);
    }
    useEffect(() => { getStudents() }, [])


    let addStudent = () => {
        navigate('/signUp')
    }

    let deleteStudent = async (id) => {
        console.log(id);
        let res = await fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' })
        res = await res.json()
        getStudents()
    }


    return (
        <>
            <>
                <h4>students</h4>
                <table>
                    <tr >
                        <td>id</td>
                        <td>last name</td>
                        <td>first name</td>
                        <td>class</td>
                    </tr>
                    {data.map((item) => {
                        return <>

                            <tr key={counter++}>
                                <td>{item.id}</td>
                                <td>{item.lastName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.className}</td>
                                <td><button name="deleteBtn" onClick={() => deleteStudent(item.id)}>🗑</button></td>
                            </tr>
                        </>
                    })}
                </table>
                <button className="btn" name="+button" onClick={() => { addStudent() }}>+</button>

            </>
        </>)
}