import firestore from "./Firestore.js";

export default class Hackathon {
    constructor(email, password, name, start, end, location, budget) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.start = start;
        this.end = end;
        this.location = location;
        this.prizes = [];
        this.applications = [];
        this.budget = budget;
        this.id = this.postToDB();
        console.log(this);
    }

    postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = db.collection("hackathons").add({
            email: this.email,
            name: this.name,
            start: this.start,
            end: this.end,
            budget: this.budget,
            prizes: this.prizes,
            location: this.location,
            applications: this.applications
        });
        //Reset user info(?)
        console.log("Submitted to the db!");
        return userRef;
    }

    updateApplicant(accept, email) {
        const db = firestore.firestore();
        //Query the db
        var userRef = db.collection("hackathons").doc(this.id);
        // Atomically add a new region to the "regions" array field.
        userRef.update({
            applications: firestore.firestore.FieldValue.arrayUnion("test_add")
        });

        console.log("Updated applicant: " + email + " in " + this.id);
        // return userRef;
    }

}


// module.exports.default({ Hackathon });