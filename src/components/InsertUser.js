import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import User from "./user.js";

export default function InsertUser() {
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [name, setName] = useState();
    
    let { hackID } = useParams();

    const submitForm = (e) => {
        e.preventDefault();
        let user = new User(email, password, name, hackID);
        user.postToDB();
    }

    return (
        <form onSubmit={submitForm}>
            <input
                type="text"
                name="name"
                placeholder="Users Name"
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                name="start"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="text"
                name="end"
                placeholder="Password"
                onChange={e => setPass(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}