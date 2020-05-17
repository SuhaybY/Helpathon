import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetUsers } from "./";
import { Hackathon } from "./index.js";
import firestore from "./Firestore.js";
import { Redirect, Link } from "react-router-dom";

import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #bb6bd9;
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

const HackathonName = styled.div`
  font-family: Inter-Bold;
  font-size: 24px;
  color: black;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  padding: 60px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  font-family: Inter-Medium;
  color: black;
  font-size: 18px;
  cursor: pointer;
  margin: 0 0 30px 0;
`;

const Title = styled.h1`
  font-family: Inter-Bold;
  color: black;
  font-size: 36px;
  margin: 0 0 50px 0;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const InfoTextContainer = styled.p`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0 100px 0 0;
`;

const InfoTextTitle = styled.p`
  font-family: Inter-SemiBold;
  color: black;
  font-size: 20px;
  margin: 0 0 20px 0;
`;

const InfoText = styled.p`
  font-family: Inter-Regular;
  color: black;
  font-size: 14px;
  margin: 0;
`;

const QuestionSelectContainer = styled.div`
  width: 50%;
  margin: 0 50px 0 0;
  display: flex;
  flex-direction: column;
`;

const QuestionSelectTitle = styled.p`
  font-family: Inter-SemiBold;
  color: black;
  font-size: 20px;
  margin: 0 0 20px 0;
`;

const QuestionSelectSubTitle = styled.p`
  font-family: Inter-Regular;
  color: black;
  font-size: 14px;
  margin: 0 0 30px 0;
`;

const QuestionWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 25px 0;
`;

const QuestionCheckbox = styled.input``;

const Question = styled.p`
  font-family: Inter-Regular;
  color: black;
  font-size: 14px;
  margin: 0 0 0 30px;
`;

const Footer = styled.div`
  width: 100%;
  height: 70px;
  background: #333333;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLogo = styled.p`
  font-family: Inter-Bold;
  font-size: 18px;
  color: white;
  margin: 0;
`;

const FooterMssg = styled.p`
  font-family: Inter-Medium;
  font-size: 14px;
  color: white;
  margin: 0;
`;

export default function CreateApplication() {
  const [loggedIn, setLoggedin] = useState(true);

  let { hackID } = useParams();
  const [name, setName] = useState("");

  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);
  const [q4, setQ4] = useState(false);
  const [q5, setQ5] = useState(false);

  const fetchHackathonData = async () => {
    let hackathon_data = await Hackathon.getHackathonFromId(hackID);
    setName(hackathon_data.name);
  };

  useEffect(() => {
    fetchHackathonData();
  }, []);

  const goBack = () => {
    setLoggedin(false);
  };

  const submitQuestions = () => {
    let questionsArray = [];
    questionsArray.push("Enter your name");
    questionsArray.push("Enter your email");
    questionsArray.push("Enter a password");
    questionsArray.push("Enter your age");
    questionsArray.push("Enter your school's name");
    questionsArray.push("Enter any dietary restrictions you may have");

    if (q1 === true) {
      questionsArray.push("Tell us about yourself (250 chars)");
    }

    if (q2 === true) {
      questionsArray.push(
        "Why do you want to attend Ryerson Hacks? (500 chars)"
      );
    }

    if (q3 === true) {
      questionsArray.push(
        "What is a challenge you recently overcame and how did you do it? (150 words)"
      );
    }

    if (q4 === true) {
      questionsArray.push("What is something you want to learn? (100 words)");
    }

    if (q5 === true) {
      questionsArray.push(
        "Tell us about a recent project you built in the last 1-2 years (100 words)"
      );
    }

    console.log(questionsArray);
  };

  return (
    <>
      {loggedIn === true ? (
        <>
          <Header>
            {/* Need to dynamically fill the name here using state */}
            <HackathonName>{name}</HackathonName>
            <SubmitButton onClick={goBack}>Logout</SubmitButton>
          </Header>
          <ContentContainer>
            <BackLink to={`/hackathon/${hackID}`}>Back to Home</BackLink>
            <Title>Create the Application Form</Title>
            <Wrapper>
              <InfoTextContainer>
                <InfoTextTitle>1. Base questions</InfoTextTitle>
                <InfoText>
                  All hackathon application forms will consist of base questions
                  such as name, email, password, age, school, and dietary
                  restrictions. You are also able to choose 3 out of 5
                  additional short answer questions to ask in the application to
                  better judge an applicant.
                </InfoText>
              </InfoTextContainer>
              <QuestionSelectContainer>
                <QuestionSelectTitle>2. Choose Questions</QuestionSelectTitle>
                <QuestionSelectSubTitle>
                  Select questions to ask
                </QuestionSelectSubTitle>
                <QuestionWrapper>
                  <QuestionCheckbox
                    type="checkbox"
                    onChange={(e) => setQ1(e.target.checked)}
                  />
                  <Question>Tell us about yourself (250 chars)</Question>
                </QuestionWrapper>
                <QuestionWrapper>
                  <QuestionCheckbox
                    type="checkbox"
                    onChange={(e) => setQ2(e.target.checked)}
                  />
                  <Question>
                    Why do you want to attend Ryerson Hacks? (500 chars)
                  </Question>
                </QuestionWrapper>
                <QuestionWrapper>
                  <QuestionCheckbox
                    type="checkbox"
                    onChange={(e) => setQ3(e.target.checked)}
                  />
                  <Question>
                    What is a challenge you recently overcame and how did you do
                    it? (150 words)
                  </Question>
                </QuestionWrapper>
                <QuestionWrapper>
                  <QuestionCheckbox
                    type="checkbox"
                    onChange={(e) => setQ4(e.target.checked)}
                  />
                  <Question>
                    What is something you want to learn? (100 words)
                  </Question>
                </QuestionWrapper>
                <QuestionWrapper>
                  <QuestionCheckbox
                    type="checkbox"
                    onChange={(e) => setQ5(e.target.checked)}
                  />
                  <Question>
                    Tell us about a recent project you built in the last 1-2
                    years (100 words)
                  </Question>
                </QuestionWrapper>
                <SubmitButton onClick={submitQuestions}>Submit</SubmitButton>
              </QuestionSelectContainer>
            </Wrapper>
          </ContentContainer>
          <Footer>
            <FooterLogo>Helpathon</FooterLogo>
            <FooterMssg>
              Created with ❤️ by fellow hackathon organizers
            </FooterMssg>
          </Footer>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
