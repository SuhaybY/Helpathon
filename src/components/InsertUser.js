import React, {useState} from 'react';
import firestore from "./Firestore.js";
import { useQrEncode, useQrDecode } from 'react-qr-hooks';

export default function User() {
    const [username, setUsername] = useState();
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [encoded, setEncoded] = useState();


    const submitForm = (e) => {
        e.preventDefault();
        //Connect to the db
        const db = firestore.firestore();
        //Query the db
        const userRef = db.collection("testQR").add({
            QRID: fullname,
            username: username,
            fullname: fullname,
            email: email,
            password: password
        });
        //Reset user info(?)
        console.log("Submitted to the db!");
    }

    const encode = useQrEncode(encoded);
    const decoded = useQrDecode(encode);

    return (
        <div>
        <form onSubmit={submitForm}>
            <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            />
            <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={e => setFullName(e.target.value)}
            />
            <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            />
            <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" onClick={() => setEncoded(username)}>Submit</button>
        </form>
        <div>
            <img src={encode} alt="My QR code" />
             <p>{decoded}</p>
        </div>
        </div>
    );
}