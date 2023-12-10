import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import MyCourses from './myCourses';
import MyExams from './myExams';
import "@progress/kendo-theme-default/dist/all.css";
import RoomScheduler from "./schedule";
import SignOut from './signOut';


/*import "./App.css";
import PickDateOfBirth from "./components/calendar/PickDateOfBirth";
import BookDrivingSlot from "./components/calendar/BookDrivingSlot";
import RoomScheduler from "./components/scheduler/RoomScheduler";
function App() {
  return (
    <div className="App">
      <PickDateOfBirth />
      <hr className="k-my-8" />
      <BookDrivingSlot />
      <hr className="k-my-8" />
      <RoomScheduler />
    </div>
  );
}*/

function Student(props) {
    const user = JSON.parse(window.localStorage.getItem("user"))

    // const [m_user, setUser] = useState("");
    // const [fullName, setName] = useState("");
    // const [m_post, setPost] = useState("");





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
                <Route exact="true" element={<MyCourses user={user} />} path="/courses" />{' '}
                <Route exact="true" element={<MyExams user={user} />} path="/grades" />{' '}
                <Route exact="true" element={<RoomScheduler user={user} />} path="/schedule" />{' '}
            </Routes>

           


            <Routes>
                {/* <Route exact="true" element={<></>} path="/" />
                <Route exact="true" element={<Posts currentUser={m_user} />} path="/posts" />{' '}
                <Route exact="true" element={<Todos currentUser={m_user} />} path="/Todos" />{' '}
                <Route exact="true" element={<Photos />} path="/Albums/photos/:idparam" />
                <Route exact="true" element={<Albums current_user={m_user} />} path="/Albums" />{' '}
                <Route exact="true" element={<Info current_user={m_user} />} path="/Info" />{' '}
                <Route exact="true" element={<SinglePost current_post={m_post} />} path="/posts/:name" />{' '}
                <Route exact="true" element={<Error />} path="/*" /> */}

            </Routes>
            <SignOut/>
        </div>
    );
}

export default Student;