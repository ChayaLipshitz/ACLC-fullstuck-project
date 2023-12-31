import React from 'react'
import { NavLink } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Login from './logIn'

export default function SignOut(props) {
    let counter=0
    // window.localStorage.clear();
    return (
        <>
        <nav>
        <NavLink activeclassname="active" key={counter++} className="nav-link" exact="true" to='/login'>Sign Out</NavLink>
        </nav>
        <Routes>
            <Route exact="true" element={<Login key={counter++} />} path='/login' />
        </Routes>

        </>
    )
}

