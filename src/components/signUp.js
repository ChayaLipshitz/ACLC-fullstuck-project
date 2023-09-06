import React, { useEffect, useReducer, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
export default function SignUp(props) {
    let counter = 0;

    console.log(props);
    const [m_classes, setClasses] = useState([]);
    const [teacher, setTeacher] = useState(false);
    const [student, setStudent] = useState(false);
    const [status, setStatus] = useState({ student: false, teacher: false });
    const [courses, setCourses] = useState([]);
    const [add, setAdd] = useState(false);
    const [course, setCourse] = useState({});
    const [courseArr, setARR] = useState({});



    let navigate = useNavigate();
    useEffect(() => {
        setCourses(props.coursesTable)
        console.log("use");
        getOptions();
    }, [])


    let changeTeacher = () => {
        setStudent(false)
        setTeacher(true);
    }

    let changeStudent = () => {
        setTeacher(false);
        setStudent(true)
    }

    let addCourse = () => {
        return <h2>hi</h2>

    }

    // let applyCourse = async (event) => {
    //     setAdd(false)
    //     const course1 = {
    //         name: event.target.name.value,
    //         id: event.target.id.value,
    //         grade: event.target.grade.value
    //     }
    //     setCourse(course1)

    // }




    async function getOptions() {
        let data = await fetch(`http://localhost:8080/api/classes`, { method: 'GET' })
        data = await data.json();
        console.log(data);
        setClasses(data);
    }

    let sendData = async (event) => {
        event.preventDefault();


        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        let array = []

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        const user = {
            "id": event.target.id.value,
            "password": event.target.pass.value,
            "first_name": event.target.firstName.value,
            "last_name": event.target.lastName.value,
            "status": student ? "student" : "teacher",
            "class": student ? event.target.class.value : 0,
            "course": teacher ? array : 0
        }

        const req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user),
            mode: 'cors'
        }
        try {
            console.log(`http://localhost:8080/api/${user.status}`);

            let res = await fetch(`http://localhost:8080/api/${user.status}s`, req)
            res = await res.json();
        }
        catch (err) {
            alert(err)
        }
        debugger
        navigate(`/secretary/${user.status}s`)
    }


    return (
        <form className='signup' onSubmit={sendData}>
            <input placeholder="your id number here" name="id" className="signup_input" type=""></input>
            <input placeholder="your first here" name="firstName" className="signup_input"></input>
            <input placeholder="your last name here" name="lastName" className="signup_input"></input>
            <input placeholder="password" type="password" name="pass" className='signup__input' />


            <input type="radio" value="teacher" name="changeStat" onClick={changeTeacher}></input>
            <label htmlFor="teacher">teacher</label>
            <input type="radio" value="student" name="changeStat" onClick={changeStudent}></input>
            <label htmlFor="student">student</label>

            {student && <select name="class">
                {m_classes.map(item => {
                    return (<option key={counter++} value={item.classId}>{item.className}</option>)
                })}
            </select>}

            {teacher && <div name="courses" >
                {courses.map(item => {
                    return (<div key={counter++}><input type="checkbox" value={item.courseId} />
                        <label htmlFor={item.courseId} >{item.courseName}</label></div>)
                })}
            </div>}

            {/* {add && <form onSubmit={applyCourse}>
                <input type="text" name="name" placeholder="course name"></input>
                <input type="number" name="grade" placeholder="passing grade"></input>
                <input type="number" name="id" placeholder="course id"></input>
                {/* {courses.map(item =>{<><input type = "checkbox" name = "courseToAdd" value = {item.courseName}></input> <label htmlFor="courseToAdd">{item.courseName}</label></>})} */}
            {/* </form>} } */}


            <button type="submit" className="button signup__submit" >Sign Up Now
                <i className="button__icon fas fa-chevron-right"></i></button>
        </form>
    )
}








