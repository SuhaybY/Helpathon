import firestore from "./Firestore.js";

export default class User {
    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.id = this.postToDB();
        this.rsvp = false;
        console.log(this);
    }

    postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = db.collection("users").add({
            email: this.email,
            name: this.name,
            rsvp: this.rsvp,
        });
        console.log("Submitted to the db!");
        return userRef;
    }

}