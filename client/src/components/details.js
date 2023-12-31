// import { Routes, Route } from 'react-router-dom'
// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom'

export default function Details(props) {
    const user =props.user;
   

    return (
        <>
        <h1>{user.firstName}</h1>
        <h1>{user.lastName}</h1>
        <h1>{user.id}</h1>
         
        </>
    )
}