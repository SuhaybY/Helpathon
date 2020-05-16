import firestore from "./Firestore.js";

class Hackathon {
    constructor(id, name, start, end, location, budget) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
        this.location = location;
        this.prizes = [];
        this.applications = {};
        this.budget = budget;
        this.postToDB();
    }

    postToDB() {
        const db = firestore.firestore();
        //Query the db
        const userRef = db.collection("hackathons").add({
            userID: this.id,
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
    }

}


module.exports({ Hackathon });