import firestore from "./Firestore.js";
import { sendEmail } from "./common.js";
export default class Hackathon {

    constructor(input) {
        if ("id" in input) {
            this.createHackathonFromId(input.id)
        } else {
            this.populateFields(
                input.email,
                input.password,
                input.name,
                input.start,
                input.end,
                input.location,
                input.budget,
                {},
                [],
                []
            )
            this.id = null;
        }
    }

    setQuestions(questions) {
        this.questions = questions;
        const db = firestore.firestore();
        console.log("Hack ID: " + this.id);
        const hackathonRef = db.collection('hackathons').doc(this.id);
        hackathonRef.get().then(doc => {
            let data = doc.data();
            hackathonRef.set({
                "questions": questions
            }, { merge: true });
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }

    getQuestions() {
        return this.questions;
    }

    // This constructor gets the fields from teh database
    createHackathonFromId(id) {
        this.id = id;
        const db = firestore.firestore();
        const hackathonRef = db.collection('hackathons').doc(this.id);
        hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let data = doc.data();
                console.log("Create");
                this.populateFields(
                    data.email,
                    data.password,
                    data.name,
                    data.start,
                    data.end,
                    data.location,
                    data.budget,
                    data.applications,
                    data.prizes,
                    data.questions
                )
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }

    static async getHackathonFromId(id) {
        const db = firestore.firestore();
        const hackathonRef = db.collection('hackathons').doc(id);
        let ret = await hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let data = doc.data();
                console.log("data");
                console.log(data);
                data.id = id;
                return data;
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
        return ret;
    }

    populateFields(email, password, name, start, end, location, budget, applications, prizes, questions) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.start = start;
        this.end = end;
        this.location = location;
        this.budget = budget;
        this.applications = applications;
        this.prizes = prizes;
        this.questions = questions;
    }

    async postToDB() {
        const db = firestore.firestore();
        //Query the db
        const hackRef = await db.collection("hackathons").add({
            email: this.email,
            name: this.name,
            password: this.password,
            start: this.start,
            end: this.end,
            budget: this.budget,
            prizes: this.prizes,
            location: this.location,
            applications: this.applications,
            questions: this.questions
        });
        this.id = hackRef.id;
        console.log("New hackathon: " + this.id + ". Submitted to the db!");
        return hackRef;
    }

    acceptReject(userID, accept = true) {
        const db = firestore.firestore();
        console.log("Hack ID: " + this.id);
        const hackathonRef = db.collection('hackathons').doc(this.id);
        hackathonRef.get().then(doc => {
            let apps = this.getApplications().then((apps) => {
                console.log(apps);
                apps[userID].status = accept ? 'accepted' : 'rejected';
                hackathonRef.set({
                    "applications": apps
                }, { merge: true });

                const userRef = db.collection('users').doc(userID).get().then(userDoc => {
                    let userData = userDoc.data();
                    let msg = '';
                    if (accept) {
                        msg = `Congratualations, you have been accepted to attend ${doc.data().name}! See you there!`
                    } else {
                        msg = `Unfortunately, you have not been accepted to attend ${doc.data().name}. Please try again next year!`
                    }
                    sendEmail(userData.email, userData.fullname, msg);
                });
            }
            );


        }).catch(err => {
            console.log('Error getting document', err);
        });
    }

    getApplications() {
        const db = firestore.firestore();
        const hackathonRef = db.collection('hackathons').doc(this.id);
        return (hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // Get hackathon document
                console.log('Document data:', doc.data());
                let data = doc.data();
                let apps = data.applications;
                return apps;
            }
        }));
    }

    getQuestionsFromDB() {
        const db = firestore.firestore();
        const hackathonRef = db.collection('hackathons').doc(this.id);
        return (hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // Get hackathon document
                console.log('Document data:', doc.data());
                let data = doc.data();
                let questions = data.questions;
                return questions;
            }
        }));
    }
}