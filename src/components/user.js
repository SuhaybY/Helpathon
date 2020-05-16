import firestore from "./Firestore.js";
import { Hackathon } from "./index.js";

export default class User {
    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.fullname = name;
        this.rsvp = false;
        this.id = null;
    }

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

    apply(hackathonID) {
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
                apps[this.email] = (this.email in apps) ? apps[this.email] : 'pending';
                hackathonRef.set({
                    "applications": apps
                }, { merge: true });
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }
}