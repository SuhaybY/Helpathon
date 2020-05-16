import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Hackathon from "./hackathon";

export default function CreateHackathon() {
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [name, setName] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [location, setLocation] = useState();
    const [budget, setBudget] = useState();

    const hackID = useRef();
    let history = useHistory();

    const submitForm = async (e) => {
        e.preventDefault();
        let hackathon = new Hackathon({
            email: email,
            password: password,
            name: name,
            start: new Date(start),
            end: new Date(end),
            location: location,
            budget: parseInt(budget.replace('$', ''))
        });
        await hackathon.postToDB();
        hackID.current = hackathon.id;
        console.log("Created a new hackathon: " + hackathon.id + ". Redirecting to hackathon management page");
        history.push("/hackathon/" + hackID.current);
    }

    return (
        <form onSubmit={submitForm}>
            <div>Hackathon Create</div>
            <input
                type="text"
                name="name"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="text"
                name="name"
                placeholder="Password"
                onChange={e => setPass(e.target.value)}
            />
            <input
                type="text"
                name="name"
                placeholder="Hackathon Name"
                onChange={e => setName(e.target.value)}
            />
            <input
                type="date"
                name="start"
                placeholder="Start Date"
                onChange={e => setStart(e.target.value)}
            />
            <input
                type="date"
                name="end"
                placeholder="End Date"
                onChange={e => setEnd(e.target.value)}
            />
            <input
                type="text"
                name="location"
                placeholder="Hackathon Location"
                onChange={e => setLocation(e.target.value)}
            />
            <input
                type="text"
                name="fullname"
                placeholder="Budget"
                onChange={e => setBudget(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}