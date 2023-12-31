import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import SignOut from './signOut';
import StudentTask from './studentTask';
import { Button } from 'react-bootstrap';

export default function CourseTasks(props) {
    const user = JSON.parse(window.localStorage.getItem("user"))
    let href = window.location.href.split('/')
    let fullCourse = href[href.length - 1]
    let courseId = fullCourse.slice(0, fullCourse.length - 6)
    console.log("coursetask for course", courseId);
    useEffect(() => {
    }, []);
    return (
        <div className="Student">
            <div className='title'>
            </div>
            {[...new Array(9).keys()].map(item => {
                return (
                    <div key={item + 1}>
                        <NavLink activeclassname="active" className="nav-link" exact="true" to={`/student/courses/${courseId}-tasks/${item +1}`}>Task {item + 1}</NavLink>
                        <Routes>
                            <Route exact="true" element={<StudentTask user={user} />} path={`/${item + 1}/*`} />{' '}
                        </Routes>
                    </div>)
            })}
            {/* <NavLink activeclassname="active" className="nav-link" exact="true" to={`/student/courses/${courseId}-tasks`}>Close</NavLink> */}
            <SignOut />
        </div>
    );
}
