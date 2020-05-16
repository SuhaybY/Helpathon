import React, { useState, useEffect } from 'react';
import firestore from "./Firestore.js";
import User from './users.js';

export default function GetUsers() {
    //Connect to the db
    const db = firestore.firestore();
    const docRef = db.collection("users");
    const [users, setUsers] = useState([]);
    const [rsvpOnly, setRSVP] = useState(false);

    useEffect(() => {
<<<<<<< HEAD
        // const getRealtimeUpdates = () => {
        const getRealtimeUpdates = docRef.onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
            const allBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(allBooks);
=======
        const getRealtimeUpdates = docRef.onSnapshot({includeMetadataChanges: true}, querySnapshot => {
            const allUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(allUsers);
            console.log(allUsers);
>>>>>>> master
        });
        console.log("Refreshed info from Firestore database!");
        return () => {
            getRealtimeUpdates();
        }
    }, []);

    const deleteUser = (id) => {
        console.log('Going to delete: ' + id);
        db.collection('users').doc(id).delete();
    };

    return (
<<<<<<< HEAD
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <div>
                        <div>Username: {user.username}</div>
                        <div>Full Name: {user.fullname}</div>
                        <div>Email: {user.email}</div>
                        {/* The following is just to check that the returned type is securely hashed */}
                        <div>Password: {user.password}</div>
                    </div>
                    <button onClick={() => deleteUser(user.id)}>Delete User</button>
                </li>
            ))}
        </ul>
=======
        <div>
            <ul>
                {users.filter(user=> !rsvpOnly || user.rsvp === rsvpOnly).map(user => (
                <li key={user.id}>
                <div>
                    <div>Email: {user.email}</div>
                    <div>Full Name: {user.fullname}</div>
                    <div>RSVP'd: {String(user.rsvp)}</div>
                    {/* The following is just to check that the returned type is securely hashed */}
                    <div>Password: {user.password}</div>
                </div>
                <button onClick={() => deleteUser(user.id)}>Delete User</button>
                </li>
                ))}
            </ul>
            <div>
                RSVP'd Only: <input type="checkbox" id="rsvpd" onClick={()=> setRSVP(!rsvpOnly) } />
            </div>
        </div>
>>>>>>> master
    );
}