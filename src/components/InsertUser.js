import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import User from "./user.js";
import { Hackathon } from "./index.js";
import firestore from "./Firestore.js";

export default function InsertUser() {
    let { hackID } = useParams();
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [name, setName] = useState();
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    // const [questionsHTML, setQuestionHTML] = useState(null);

    const db = firestore.firestore();
    const hackathonRef = db.collection('hackathons').doc(hackID);

    useEffect(async () => {
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
            }
        }).catch(err => {
            console.log('Error getting hackathon', err);
        });

        console.log("Refreshed info from Firestore database! All questions:")
        console.log(questions);
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        let user = new User(email, password, name);
        await user.postToDB();
        console.log("Ans");
        console.log(answers);
        user.apply(hackID, answers);
    }

    console.log("before return");
    console.log(questions);
    const listTest = ['h', 'e', 'l', 'l', 'o'];
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
            {questions.map((question, index) => (
                <>
                    <div>Question: {question}</div>
                    <input
                        key={index}
                        type="text"
                        name={`Question #${index}`}
                        placeholder={`Answer #${index}`}
                        onSubmit={e => setAnswers(answers => [...answers, e.target.value])}
                    />
                </>
            ))}
            {console.log(listTest)}
            <button type="submit">Submit</button>
        </form>
    );
}