import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom'
import SignUp from './signUp';

export default function StudentsTable(props) {

    // const user = props.user;
    const [data, setData] = useState([]);
    let counter = 0;

    let getStudents = async () => {
        let m_data = await fetch('http://localhost:8080/api/students', { method: 'GET' })
        m_data = await m_data.json()
        setData(m_data)
        console.log(m_data);
    }
    useEffect(() => { getStudents() }, [])


    let deleteStudent = async (id) => {
        console.log(id);
        let res = await fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' })
        await res.json()
        getStudents()
    }


    return (
        <>
            <>
                <h4>students</h4>
                <table>
                    <tr >
                        <th>id</th>
                        <th>last name</th>
                        <th>first name</th>
                        <th>class</th>
                    </tr>
                    {data.map((item) => {
                        return (

                            <tr key={counter++}>
                                <td>{item.id}</td>
                                <td>{item.lastName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.className}</td>
                                <td><button name="deleteBtn" onClick={() => deleteStudent(item.id)}>🗑</button></td>
                            </tr>
                        )
                    })}
                </table>

              
            </>
        </>)
}