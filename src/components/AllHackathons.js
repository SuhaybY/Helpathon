import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import firestore from "./Firestore.js";

export default function AllHackathons() {
    //Connect to the db
    const db = firestore.firestore();
    const docRef = db.collection("hackathons");
    const [hackathons, setHackathons] = useState([]);
    let history = useHistory();

    useEffect(() => {
        const getRealtimeUpdates = docRef.onSnapshot({includeMetadataChanges: true}, querySnapshot => {
            const allHackathons = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHackathons(allHackathons);
            console.log("Refreshed info from Firestore database! All users:")
            console.log(allHackathons);
        });
        return () => {
            getRealtimeUpdates();
        }
    }, []);

    const viewHackathon = (hackID) => {
        history.push("/hackathon/hackID");
    };

    const createHackathon = () => {
        history.push("/hackathon");
    };

    const joinHackathon = (hackID) => {
        history.push("/applicant/hackID");
    };

    return (
        <div>
            <button onClick={() => createHackathon()}>Create Hackathon</button>
            <ul>
                {hackathons.map(hackathon => (
                <li key={hackathon.id}>
                <div>
                    <div>Name: {hackathon.name}</div>
                    <div>Email: {hackathon.email}</div>
                    <div>Location: {hackathon.location}</div>
                </div>
                <button onClick={() => viewHackathon(hackathon.id)}>View</button>
                <button onClick={() => joinHackathon(hackathon.id)}>Register</button>
                </li>
                ))}
            </ul>
        </div>
    );
}