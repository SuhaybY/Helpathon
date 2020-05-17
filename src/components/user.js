import firestore from "./Firestore.js";

export default class User {
    constructor(email, password, name, hackID) {
        this.email = email;
        this.password = password;
        this.fullname = name;
        this.rsvp = false;
        this.id = null;
        this.hackID = hackID;
        this.status = "pending";
    }

    async postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = await db.collection("users").add({
            email: this.email,
            fullname: this.fullname,
            rsvp: this.rsvp,
            password: this.password,
            status: this.status
        });
        this.id = userRef.id;
        const hackRef = await db.collection("hackathons").doc(this.hackID);
        hackRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such hackathon!');
            } else {
                // Get hackathon document
                console.log('Document data:', doc.data());
                let data = doc.data();
                let apps = data.applications;
                apps[this.id] = null;
                hackRef.set({
                    "applications": apps
                }, { merge: true });
            }
        }).catch(err => {
            console.log('Error getting hackathon', err);
        });
        console.log("New user [below]. Submitted to the db!");
        console.log(this);
        return userRef;
    }
}