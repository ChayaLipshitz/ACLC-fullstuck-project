import React, { useEffect, useReducer, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
export default function Login() {
    let data
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
            if (data.length == 0) {
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
        <input placeholder="your id number here" name="id" className="login__input"></input>
        <input placeholder="password" name="pass" className='login__input'></input>
        <select name="userStatus" >
            <option value="student">student</option>
            <option value="teacher">teacher</option>
            <option value="secretary">secretary</option>
        </select>
        <button type="submit" className="button login__submit">Log In Now
            <i className="button__icon fas fa-chevron-right"></i></button>
    </form>
)
}