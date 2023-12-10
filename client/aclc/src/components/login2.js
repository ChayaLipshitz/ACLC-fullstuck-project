import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    let navigate = useNavigate();
    async function getData(event) {
        event.preventDefault();
        const user = {
            id: event.target.id.value,
            password: event.target.pass.value,
            status: event.target.userStatus.value
        }
        console.log(user);
        try {
            let data = await fetch(`http://localhost:8080/api/${user.status}s/${user.id}`, { method: 'GET' })
            data = await data.json();
            console.log(data[0])
            if (data.length === 0) {
                throw ("user does not exist")
            }
            delete data[0].password;
            window.localStorage.setItem("user", JSON.stringify(data[0]));
            navigate(`/${user.status}`);
        }
        catch (err) {
            alert(err)
        }
    }
    return (
        <form className='login' onSubmit={getData}>
            <input placeholder="ID number" name="id" className="login__input"></input>
            <input placeholder="Password" name="pass" className='login__input'></input>
            <select name="userStatus" >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="secretary">Secretary</option>
            </select>
            <button type="submit" className="button login__submit">Log in now
                <FontAwesomeIcon icon={faChevronRight} />
                {/* <i className="button__icon fas fa-chevron-right"></i>
            <i class="fa fa-chevron-right" aria-hidden="true"></i> */}
            </button>
        </form>
    )
}