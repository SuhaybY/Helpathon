import React, { useEffect, useState } from "react";
import { produce } from "immer";
import { useParams, useHistory } from "react-router-dom";
import User from "./user.js";
import { Hackathon } from "./index.js";
import firestore from "./Firestore.js";
import emailjs from "emailjs-com";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
`;

const Title = styled.h1`
  font-family: Inter-Bold;
  font-size: 80px;
  color: black;
  margin: 100px 0 20px 0;
`;

const DateLocationWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 60px 0;
`;

const HDate = styled.p`
  font-family: Inter-Medium;
  font-size: 24px;
  color: black;
  margin: 0 60px 0 0;
`;

const Location = styled.p`
  font-family: Inter-Medium;
  font-size: 24px;
  color: black;
  margin: 0 0px 0 0;
`;

const ApplicationTitle = styled.p`
  font-family: Inter-SemiBold;
  font-size: 24px;
  color: black;
  margin: 0 0px 20px 0;
`;

const ApplicationContainer = styled.form`
  width: 700px;
  height: fit-content;
  box-sizing: border-box;
  padding: 40px 80px 40px 80px;
  background: #f2f2f2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 0 100px 0;
`;

const InputLabel = styled.label`
  font-family: Inter-Regular;
  color: black;
  font-size: 15px;
  margin: 0 0 10px 0;
`;

const TextInput = styled.input`
  width: 50%;
  height: 30px;
  border-radius: 100px;
  background: white;
  font-family: Inter-Regular;
  color: black;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 0 20px 0 20px;
  margin: 0 0 30px 0;
`;

const SubmitButton = styled.button`
  width: fit-content;
  padding: 15px 20px;
  font-family: Inter-SemiBold;
  color: White;
  font-size: 14px;
  background: #333333;
  border-radius: 100px;
  margin: 0 0 0 0;
  outline: none;
  border: none;
  cursor: pointer;
`;

const FooterText = styled.p`
  margin: 0 auto 40px auto;
  text-align: center;
  font-family: Inter-Medium;
  font-size: 14px;
  color: black;
`;

const LoginLink = styled.span`
  font-family: Inter-SemiBold;
  font-size: 14px;
  color: black;
  margin: 0 0px 0 0;
  cursor: pointer;
`;

export default function InsertUser() {
  let history = useHistory();
  let { hackID } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [questions, setQuestions] = useState([]);
  // const [questionsHTML, setQuestionHTML] = useState(null);
  const db = firestore.firestore();
  const hackathonRef = db.collection("hackathons").doc(hackID);
  const [answers, setAnswers] = useState([]);
  const doThing = async () => {
    let hackathon = await Hackathon.getHackathonFromId(hackID);
    // Get all questions
    const getQuestions = await db.collection("hackathons").doc(hackID);
    getQuestions
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such hackathon!");
        } else {
          console.log("All questions data found: ", doc.data());
          let data = doc.data().questions;
          console.log("Data object to debug:");
          console.log(data);
          setQuestions((questions) => [...questions, ...data]);
          setAnswers(Array(questions.length));
        }
      })
      .catch((err) => {
        console.log("Error getting hackathon", err);
      });

    console.log("Refreshed info from Firestore database! All questions:");
    console.log(questions);
  };
  useEffect(() => {
    doThing();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it
    const mssg =
      "Thank you for signing up! We will review your application and get back to you ASAP. Thank you!";
    emailjs
      .send(
        "gmail",
        "template_VzSEwjSD",
        {
          to_email: email,
          to_name: name,
          from_name: "HelpathonOrg",
          message_html: mssg,
        },
        "user_zYnljTsUoMvO5zCawfDVa"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // Get id of user
    const db = firestore.firestore();
    const userRef = await db
      .collection("users")
      .where("email", "==", email.toLowerCase())
      .get();

    if (userRef.empty) {
      console.log("User not found.\nCreating new user");
      let user = new User({
        fullname: name,
        email: email.toLowerCase(),
        password: password,
      });
      await user.postToDB();
      console.log("User created with ID: ", user.id);
      console.log("Applying to hackathon:", hackID);
      user.apply(hackID, answers);
      sendEmail(e);
      history.push("/applicant/" + hackID);
    } else {
      let doc = userRef.docs[0];
      let docData = doc.data();
      if (docData.password != password) {
        console.log("Wrong password!");
        console.log(userRef);
        console.log(docData);
        console.log(docData.password);
      } else {
        let user = new User({ id: doc.id });
        console.log("Logged in user: " + user.id + ".");
        console.log(answers);
        user.apply(hackID, answers);
        sendEmail(e);
        history.push("/applicant/" + hackID);
      }
    }
    console.log("ANSSNSNNS", answers);
  };

  const [hName, setHName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");

  const fetchHackathonData = async () => {
    let hackathon_data = await Hackathon.getHackathonFromId(hackID);
    setHName(hackathon_data.name);
    setLocation(hackathon_data.location);
    let startDate = new Date(
      hackathon_data.start.seconds * 1000
    ).toLocaleDateString();
    setStart(startDate);
    let endDate = new Date(
      hackathon_data.end.seconds * 1000
    ).toLocaleDateString();
    setEnd(endDate);
  };

  useEffect(() => {
    fetchHackathonData();
  }, []);

  const goBack = () => {
    history.replace("/");
  };

  return (
    <>
      <Container>
        <ContentWrapper>
          <Title>{hName}</Title>
          <DateLocationWrapper>
            <HDate>
              {start} - {end}
            </HDate>
            <Location>{location}</Location>
          </DateLocationWrapper>
          <ApplicationTitle>Application</ApplicationTitle>
          <ApplicationContainer onSubmit={submitForm}>
            <InputLabel>Enter your name</InputLabel>
            <TextInput
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></TextInput>
            <InputLabel>Enter your email</InputLabel>
            <TextInput
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></TextInput>
            <InputLabel>Enter your password</InputLabel>
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            ></TextInput>
            {questions.map((question, index) => (
              <>
                <InputLabel>{question}</InputLabel>
                <TextInput
                  key={index}
                  type="text"
                  name={`Question #${index}`}
                  placeholder={`your answer`}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAnswers((currAns) =>
                      produce(currAns, (v) => {
                        v[index] = val;
                      })
                    );
                  }}
                />
              </>
            ))}
            <SubmitButton type="submit">Submit</SubmitButton>
          </ApplicationContainer>
          <FooterText>
            Created with ❤️ using{" "}
            <LoginLink onClick={goBack}>Helpathon</LoginLink>
          </FooterText>
        </ContentWrapper>
      </Container>
    </>
  );
}
