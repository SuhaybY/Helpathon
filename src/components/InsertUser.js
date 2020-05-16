import React, { useState } from 'react';
import firestore from "./Firestore.js";
import Hackathon from "./hackathon.js";

export default function User() {
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [name, setName] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        let user = new User(email, password, name);
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
                onChange={e => setStart(e.target.value)}
            />
            <input
                type="text"
                name="end"
                placeholder="Password"
                onChange={e => setEnd(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}