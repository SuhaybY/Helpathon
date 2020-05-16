import firestore from "./Firestore.js";
import { Hackathon } from "./index.js";

export default class User {
    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.fullname = name;
        this.id = this.postToDB();
        console.log(this);
    }

    async postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = await db.collection("users").add({
            email: this.email,
            fullname: this.fullname,
        });
        //Reset user info(?)
        console.log("Submitted to the db!");
        return userRef;
    }

    apply(hackathonID) {
        const db = firestore.firestore();
        console.log("Hack ID: " + hackathonID);
        let hackathon = db.collection('hackathons').doc(hackathonID).get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // Get hackathon document
                console.log('Document data:', doc.data());
                let data = doc.data();
                data.applications[this.email] = 'pending';  // Note that applications are referred to by email, not users database ID

                // Update hackathon applications
                db.collection("hackathons").doc(doc.id).update(data);

                return data;
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }
}