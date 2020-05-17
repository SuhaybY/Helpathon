import firestore from "./Firestore.js";

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
            let apps = this.getApplications();
            apps[userID].status = accept ? 'accepted' : 'rejected';
            hackathonRef.set({
                "applications": apps
            }, { merge: true });
            // if (!doc.exists) {
            //     console.log('No such document!');
            // } else {
            //     // Get hackathon document
            //     console.log('Document data:', doc.data());
            //     let data = doc.data();
            //     let apps = data.applications;
            //     apps[userID].status = accept ? 'accepted' : 'rejected';
            //     hackathonRef.set({
            //         "applications": apps
            //     }, { merge: true });

            //     // This is where you would send an email to the user
            // }
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
}