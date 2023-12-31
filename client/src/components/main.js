import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './logIn'
import Student from './student'
import Secretary from './secretary'
import SignUp from './signUp'
import {  useState } from 'react'
import Teacher from './teacher'
import AddUser from './addUser'
//import "../node_modules/bootstrap/dist/css/bootstrap.css";


function Main() {
    const [courses, setCourses] = useState({});
    return (
        <div className="Main">
            <Routes>
                <Route exact="true" element={<Login/>} path="/login" />
                <Route exact="true" element={<Login />} path="/*"  to="/login"/>
                {<Route exact="true" element={<Student />} path="/student/*" />}
                {<Route exact="true" element={<Teacher />} path="/teacher/*" />}
                {<Route exact="true" element={<Secretary myCourses = {setCourses}/>} path="/secretary/*" />}
                {<Route exact="true" element={<AddUser/>} path="/signup" />}
                {/* <Route exact="true" element={<Error />} path="/signup" /> */}
            </Routes>
        </div>
    );
}

export default Main;
