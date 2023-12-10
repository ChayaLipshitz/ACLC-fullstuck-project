import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Col } from 'react-bootstrap'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { dom } from '@fortawesome/fontawesome-svg-core'


export default function Login() {
    dom.watch()

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
        <div className="container">
            <script src="https://kit.fontawesome.com/3fd19055dd.js" crossOrigin="anonymous"></script>
            <div className="form-box">
                <div className="header-form">
                    <h4 className="text-primary text-center">

                        <FontAwesomeIcon icon={faUserCircle} size="4x" />
                    </h4>                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form onSubmit={getData}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons" ><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                            <input type="text" name="id" className="form-control" placeholder="ID number" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons"><FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                            <input type="text" name="pass" className="form-control" placeholder="Password" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text form_icons"><FontAwesomeIcon icon={faAddressCard} />
                                </span>
                            </div>
                            <select name="userStatus" >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="secretary">Secretary</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block" >LOGIN</button>
                        <div className="message">
                            <div><input type="checkbox" /> Remember ME</div>
                            <div><a href="#">Forgot your password</a></div>
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