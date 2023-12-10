import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import TeachersTable from './teachersTable';
import StudentsTable from './StudentsTable';

export default function Secretary(props) {
    const user = JSON.parse(window.localStorage.getItem("user"));
let setCourses = ()=>{

}
 let counter = 0;
    console.log("im hereeeeeeeeeeeeeee");
    console.log(props);

    return (
        <>
            <h1>{user.firstName}</h1>
            <h1>{user.lastName}</h1>
            <h1>{user.id}</h1>
            <nav>
            <NavLink activeclassname="active" key={counter++} className="nav-link" exact="true" to='/secretary/teachers'>Teachers details</NavLink>
            <NavLink activeclassname="active" key={counter++} className="nav-link" exact="true" to='/secretary/students' >Students details</NavLink>
            </nav>
            
            <Routes>
                <Route exact="true" element={<TeachersTable  key={counter++} courses = {props.myCourses}/>} path='/teachers/*' />
                <Route exact="true" element={<StudentsTable key={counter++} />} path='/students/*' />
            </Routes>

        </>
    )
}