import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import MyCourses from './myCourses';
import MyExams from './myExams';
import "@progress/kendo-theme-default/dist/all.css";
import RoomScheduler from "./schedule";
import SignOut from './signOut';

function Student(props) {
  const user = JSON.parse(window.localStorage.getItem("user"))
  useEffect(() => {
  }, []);
  return (
    <div className="Student">
      <div className='title'>
        <h1 className='title'>{`Hello ${user.firstName}!`}</h1>
      </div>
      <NavLink activeclassname="active" className="nav-link" exact="true" to={`/student/courses`}>the courses </NavLink>
      <NavLink activeclassname="active" className="nav-link" exact="true" to={`/student/grades`}>the exams </NavLink>
      <NavLink activeclassname="active" className="nav-link" exact="true" to={`/student/schedule`}>schedule </NavLink>
      <Routes>
        <Route exact="true" element={<MyCourses user={user} />} path="/courses/*" />{' '}
        <Route exact="true" element={<MyExams user={user} />} path="/grades" />{' '}
        <Route exact="true" element={<RoomScheduler user={user} />} path="/schedule" />{' '}
      </Routes> 
      <SignOut />
    </div>
  );
}
export default Student;