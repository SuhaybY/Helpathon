import firestore from "./Firestore.js";
import { Hackathon } from "./index.js";

export default class User {
    constructor(input) {
        if ("id" in input) {
            this.createUserFromId(input.id);
        } else {
            this.email = input.email;
            this.password = input.password;
            this.fullname = input.name;
            this.rsvp = false;
            this.id = null;
        }
    }

    createUserFromId(id) {
        this.id = id;
        const db = firestore.firestore();
        const hackathonRef = db.collection('users').doc(this.id);
        hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such user!');
            } else {
                let data = doc.data();
                console.log("Create");
                this.email = data.email;
                this.password = data.password;
                this.fullname = data.fullname;
                this.rsvp = false;
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }

    static async getUserFromId(id) {
        const db = firestore.firestore();
        const userRef = db.collection('users').doc(id);
        let ret = await userRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such user!');
            } else {
                let data = doc.data();
                data.id = id;
                return data;
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
        return ret;
    }

    // static async updateUserFromId(id) {
    //     const db = firestore.firestore();
    //     const userRef = db.collection('users').doc(id);
    //     userRef.get().then(doc => {
    //         if (!doc.exists) {
    //             console.log('No such document!');
    //         } else {
    //             // Get hackathon document
    //             console.log('User data:', doc.data());
    //             let data = doc.data();
    //             let apps = data.applications;
    //             let applicationField = {
    //                 status: 'pending',
    //                 answers: answerArray
    //             }
    //             userRef.update({
    //                 "applications": apps
    //             }, { merge: true });
    //         }
    //     }).catch(err => {
    //         console.log('Error getting document', err);
    //     });
    // }

    async postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = await db.collection("users").add({
            email: this.email,
            fullname: this.fullname,
            rsvp: this.rsvp,
            password: this.password
        });
        this.id = userRef.id;
        console.log("New user [below]. Submitted to the db!");
        console.log(this);
        return userRef;
    }

    apply(hackathonID, answerArray) {
        const db = firestore.firestore();
        console.log("Hack ID: " + hackathonID);
        const hackathonRef = db.collection('hackathons').doc(hackathonID);
        hackathonRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // Get hackathon document
                console.log('Document data:', doc.data());
                let data = doc.data();
                let apps = data.applications;
                console.log("Ans", answerArray);
                let applicationField = {
                    status: 'pending',
                    answers: answerArray
                }
                apps[this.id] = (this.id in apps) ? apps[this.id] : applicationField;
                console.log(apps);
                hackathonRef.set({
                    "applications": apps
                }, { merge: true });
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }
}