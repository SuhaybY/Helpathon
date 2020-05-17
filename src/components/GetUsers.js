import React, { useState, useEffect } from 'react';
import firestore from "./Firestore.js";
import { Hackathon } from './index.js';

export default function GetUsers({ hackID }) {
    //Connect to the db
    const db = firestore.firestore();
    const hackRef = db.collection("hackathons").doc(hackID);
    const userRef = db.collection("users");
    const [users, setUsers] = useState([]);
    const [rsvpOnly, setRSVP] = useState(false);
    let hackathon = new Hackathon({ id: hackID });

    function getRegistered(tHackUsers) {
        setUsers([]);
        // Query the obtained users now
        tHackUsers.forEach(function(entry) {
            userRef.doc(entry[0]).get().then(function(querySnapshot) {
                setUsers(users => [...users, {...querySnapshot.data(), id : querySnapshot.id, "status" : entry[1]}]);
            }); 
        });
    }

    //UseEffect for an updated, registered user
    useEffect(() => {
        const getRealtimeHackathonUpdates = hackRef.onSnapshot(function(doc) {
            var tHackUsers = [];
            var apps = doc.data().applications;
            Object.keys(apps).forEach(function(key) {
                tHackUsers.push([key, apps[key]]);
            });
            getRegistered(tHackUsers);
        });
        return () => {
            getRealtimeHackathonUpdates();
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
                            <div>Status: {user.status}</div>
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