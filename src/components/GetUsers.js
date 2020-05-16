import React, { useState, useEffect } from 'react';
import firestore from "./Firestore.js";

export default function User() {
    //Connect to the db
    const db = firestore.firestore();
    const docRef = db.collection("users");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // const getRealtimeUpdates = () => {
        const getRealtimeUpdates = docRef.onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
            const allBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(allBooks);
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
    );
}