import React, { useEffect, useState } from 'react';
import { produce } from 'immer';
import { useParams } from 'react-router-dom';
import User from "./user.js";
import { Hackathon } from "./index.js";
import firestore from "./Firestore.js";

export default function InsertUser() {
    let { hackID } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [questions, setQuestions] = useState([]);
    // const [questionsHTML, setQuestionHTML] = useState(null);
    const db = firestore.firestore();
    const hackathonRef = db.collection('hackathons').doc(hackID);
    const [answers, setAnswers] = useState([]);
    const doThing = async () => {
        let hackathon = await Hackathon.getHackathonFromId(hackID);
        // Get all questions
        const getQuestions = await db.collection("hackathons").doc(hackID);
        getQuestions.get().then(doc => {
            if (!doc.exists) {
                console.log('No such hackathon!');
            } else {
                console.log('All questions data found: ', doc.data());
                let data = doc.data().questions;
                console.log("Data object to debug:");
                console.log(data);
                setQuestions(questions => [...questions, ...data]);
                setAnswers(Array(questions.length));
            }
        }).catch(err => {
            console.log('Error getting hackathon', err);
        });

        console.log("Refreshed info from Firestore database! All questions:")
        console.log(questions);
    }
    useEffect(() => {
        doThing();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        // Get id of user
        const db = firestore.firestore();
        const userRef = await db
            .collection("users")
            .where("email", "==", email.toLowerCase())
            .get()

        if (userRef.empty) {
            console.log("Wrong email!");
        } else {
            let doc = userRef.docs[0];
            let docData = doc.data();
            if (docData.password != password) {
                console.log("Wrong password!");
                console.log(userRef);
                console.log(docData);
                console.log(docData.password);
            } else {
                let user = new User({ id: doc.id });
                console.log(
                    "Logged in user: " +
                    user.id +
                    "."
                );
                console.log(answers);
                user.apply(hackID, answers);
            }
        }
        console.log("ANSSNSNNS", answers);
    }

    return (
        <form onSubmit={submitForm}>
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
            {questions.map((question, index) => (
                <>
                    <div>Question: {question}</div>
                    <input
                        key={index}
                        type="text"
                        name={`Question #${index}`}
                        placeholder={`Answer #${index}`}
                        onChange={e => {
                            const val = e.target.value;
                            setAnswers(currAns =>
                                produce(currAns, v => {
                                    v[index] = val;
                                })
                            );
                        }}
                    />
                </>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}