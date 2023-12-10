import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './addUser.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCheckCircle, faPen, faStream, faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { dom } from '@fortawesome/fontawesome-svg-core'



export default function AddUser(props) {
    let counter = 0;
    const [teacher, setTeacher] = useState(false);
    const [status, setStatus] = useState('');
    const [student, setStudent] = useState(false);
    // const [status, setStatus] = useState({ student: false, teacher: false });
    const [courses, setCourses] = useState([]);
    const [m_classes, setClasses] = useState([]);

    // const [add, setAdd] = useState(false);
    // const [course, setCourse] = useState({});
    // const [courseArr, setARR] = useState({});



    let navigate = useNavigate();
    useEffect(() => {
        console.log("use");
        // getOptions();
    }, [])

    useEffect(() => {
        if (status == "teacher") {
            console.log("in student fetch and courses is: ", courses);

            if (courses.length == 0) {
                let data = getlist('courses')
                // let data = await fetch(`http://localhost:8080/api/courses`, { method: 'GET' })
                // data = await data.json();
                console.log('courses', data);
                data.then(res => { console.log("courses from then: ", res[0]); setCourses(res) })
                // setCourses(data);
            }
        }
        else if (status == 'student') {
            console.log("in student fetch and classes is: ", m_classes);
            if (m_classes.length == 0) {
                let data = getlist('classes')

                // let data = await fetch(`http://localhost:8080/api/classes`, { method: 'GET' })
                // data = await data.json();
                console.log(data);
                data.then(res => { console.log("classes from then: ", res); setClasses(res); })
                // setClasses(data);
            }
        }
        console.log('setStatus was called and status is: ', status);
    }, [status]);


    let changeTeacher = () => {
        setStudent(false)
        setTeacher(true);
    }

    let changeStudent = () => {
        setTeacher(false);
        setStudent(true)
    }

    // let addCourse = () => {
    //     return <h2>hi</h2>

    // }

    // let applyCourse = async (event) => {
    //     setAdd(false)
    //     const course1 = {
    //         name: event.target.name.value,
    //         id: event.target.id.value,
    //         grade: event.target.grade.value
    //     }
    //     setCourse(course1)

    // }

    async function getlist(type) {
        let data = await fetch(`http://localhost:8080/api/${type}`, { method: 'GET' })
        data = await data.json();
        console.log(data);
        return data;
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
            await res.json();
        }
        catch (err) {
            alert(err)
        }
        debugger
        navigate(`/secretary/${user.status}s`)
    }


  

    const [checkedModelList, setCheckedModelList] = useState([]);
  
    const onChangeModel = (e) => {
      const ischecked = e.target.checked;
      const dataid = e.target.dataset.id; 
      console.log("dataid", dataid);     
        if (ischecked === true) {
          setCheckedModelList((prevalue) => [...prevalue, dataid]);
        } else {
          const resultfilter = checkedModelList.filter((d, index) => {
            return d !== dataid;
          });
          setCheckedModelList(resultfilter);        
      }
    };
  
    // Checkbox Checkedinput lists array
    console.log(checkedModelList);
  
    const formSubmitEvent = (e) => {
      e.preventDefault();
  
      // Result On Submit Click
      // console.log(checkedModelList);
    };


    return (
        <div className="container">
            <script src="https://kit.fontawesome.com/3fd19055dd.js" crossOrigin="anonymous"></script>
            <div className="form-box" style={{ height: "580px" }}>
                <div className="header-form">
                    <h1>Sign Up</h1>
                    <h4 className="text-primary text-center">

                        <FontAwesomeIcon icon={faUserCircle} size="4x" />
                    </h4>                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form>
                        {/* <form onSubmit={getData}> */}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons" ><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                            <input type="text" name="id" className="form-control" placeholder="ID number" required />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons" ><FontAwesomeIcon icon={faStream} /></span>
                            </div>
                            <input type="text" name="firstName" className="form-control" placeholder="First name" required />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons" ><FontAwesomeIcon icon={faPen} /></span>
                            </div>
                            <input type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons"><FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                            <input type="text" name="pass" className="form-control" placeholder="Password" required />
                        </div>
                        <div className="input-group mb-3">

                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons"><FontAwesomeIcon icon={faAddressCard} />
                                </span>
                            </div>

                            <select name="userStatus" defaultValue="Select status" onChange={(ev) => { setStatus(ev.target.value) }} required>
                                <option value="Select status">Select status</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">

                            {status == "student" && m_classes &&
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text form_icons"><FontAwesomeIcon icon={faCheckCircle} />
                                        </span>
                                    </div>
                                    {/* <input type="text" name="pass" className="form-control" placeholder="Password" required /> */}

                                    <select name="class" className='form-control'>
                                        {m_classes.map(item => {
                                            return (
                                                <option key={counter++} value={item.classId}>
                                                    {item.className}
                                                </option>)
                                        })}
                                    </select>
                                </div>}
                            {status == "teacher" && courses &&
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text form_icons"><FontAwesomeIcon icon={faCheckCircle} />
                                        </span>
                                    </div>
                                    {/* <input type="text" name="pass" className="form-control" placeholder="Password" required /> */}
                                    <div className="row">

                                    {courses.map(dvalue => {
                                        return (
                                            // <div key={counter++}>
                                            //     <input type="checkbox" value={dvalue.courseId} />
                                            //     <label htmlFor={dvalue.courseId} >{dvalue.courseName}</label>

                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox d-inline-block mr-2">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input checkbox-input"
                                                                data-id={dvalue.courseId}
                                                                id={dvalue.courseId}
                                                                value={dvalue.courseId}
                                                                onChange={onChangeModel}
                                                                checked={checkedModelList.includes(dvalue.courseId)}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={dvalue.courseId}
                                                            >
                                                                {dvalue.courseName}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            // </div>
                                            )
                                    })}</div>
                                </div>}
                            {/* <input type="text" name="pass" className="form-control" placeholder="Password" required /> */}
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block" >SIGN UP</button>
                        <div className="message">
                        </div>
                    </form>
                    <div className="social">
                        <a href="#" ><FontAwesomeIcon icon={faFacebook} size="4x" className='icons' /></a>
                        <a href="#" ><FontAwesomeIcon icon={faTwitterSquare} size="4x" className='icons' /></a>
                        <a href="#"><FontAwesomeIcon icon={faGoogle} size="4x" className='icons' /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}








