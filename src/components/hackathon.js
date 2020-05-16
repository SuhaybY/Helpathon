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
        this.applications = {};
        this.budget = budget;
        this.id = null;
    }

    async postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = await db.collection("hackathons").add({
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
        this.id = userRef.id;
        console.log("Submitted to the db!");
        return userRef;
    }

}