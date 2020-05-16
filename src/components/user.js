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
                // let data = doc.data();
                // data.applications[this.email] = 'pending';  // Note that applications are referred to by email, not users database ID

                // Update hackathon applications
                hackathonRef.update({
                    applications: firestore.firestore.FieldValue.arrayUnion({"email" : this.email, "status" : "pending"})
                });

                // return data;
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }
}