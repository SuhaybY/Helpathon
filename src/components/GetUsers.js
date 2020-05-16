import React, { useState, useEffect } from 'react';
import firestore from "./Firestore.js";
import { Hackathon } from './index.js';

export default function GetUsers({ hackID }) {
    //Connect to the db
    const db = firestore.firestore();
    const docRef = db.collection("users");
    const [users, setUsers] = useState([]);
    const [rsvpOnly, setRSVP] = useState(false);
    let hackathon = new Hackathon({ id: hackID });

    useEffect(() => {
        const getRealtimeUpdates = docRef.onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
            const allUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(allUsers);
            console.log("Refreshed info from Firestore database! All users:")
            console.log(allUsers);
        });
        return () => {
            getRealtimeUpdates();
        }
    }, []);

    const deleteUser = (id) => {
        console.log('Going to delete: ' + id);
        db.collection('users').doc(id).delete();
    };

    const acceptUser = (id) => {
        console.log('Going to accept: ' + id);
        hackathon.acceptReject(id, true);
    };

    const rejectUser = (id) => {
        console.log('Going to reject: ' + id);
        hackathon.acceptReject(id, false);
    };

    return (
        <div>
            <ul>
                {users.filter(user => !rsvpOnly || user.rsvp === rsvpOnly).map(user => (
                    <li key={user.id}>
                        <div>
                            <div>Email: {user.email}</div>
                            <div>Full Name: {user.fullname}</div>
                            <div>RSVP'd: {String(user.rsvp)}</div>
                            {/* The following is just to check that the returned type is securely hashed */}
                            <div>Password: {user.password}</div>
                        </div>
                        <button onClick={() => deleteUser(user.id)}>Delete User</button>
                        <button onClick={() => acceptUser(user.id)}>Accept User</button>
                        <button onClick={() => rejectUser(user.id)}>Reject User</button>
                    </li>
                ))}
            </ul>
            <div>
                RSVP'd Only: <input type="checkbox" id="rsvpd" onClick={() => setRSVP(!rsvpOnly)} />
            </div>
        </div>
    );
}