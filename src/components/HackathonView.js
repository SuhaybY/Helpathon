import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetUsers } from "./";
import { Hackathon } from "./index.js";
import firestore from "./Firestore.js";
import { Redirect, useHistory } from "react-router-dom";

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

const GeneralWrapper = styled.div`
  width: 100%;
  height: calc(50% - 25px);
  margin: 0 0 50px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BudgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const BudgetHeader = styled.p`
  font-family: Inter-Regular;
  font-size: 14px;
  color: black;
  margin: 0 0 10px 0;
`;

const BudgetAmount = styled.h5`
  font-family: Inter-Bold;
  font-size: 64px;
  color: black;
  margin: 0;
`;

const SectionWrapper = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  width: calc(50% - 2.5%);
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.color};
`;

const SectionTitle = styled.h6`
  font-family: Inter-SemiBold;
  font-size: 24px;
  color: black;
  margin: 0 0 20px 0;
`;

const ApplicationWrapper = styled.div`
  width: 100%;
  height: calc(50% - 25px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppNoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const AppNoHeader = styled.p`
  font-family: Inter-Regular;
  font-size: 14px;
  color: black;
  margin: 0 0 10px 0;
`;

const AppNoAmount = styled.h5`
  font-family: Inter-Bold;
  font-size: 64px;
  color: black;
  margin: 0 0 0 0;
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

export default function ViewHackathon() {
  const [loggedIn, setLoggedin] = useState(true);

  let { hackID } = useParams();
  const db = firestore.firestore();
  const docRef = db.collection("hackathons");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  let history = useHistory();

  const fetchHackathonData = async () => {
    let hackathon_data = await Hackathon.getHackathonFromId(hackID);
    setName(hackathon_data.name);
    setBudget(hackathon_data.budget);
  };

  useEffect(() => {
    fetchHackathonData();
  }, []);

  const goBack = () => {
    setLoggedin(false);
  };

  const createAppHandler = () => {
    history.push("/hackathon/" + hackID + "/create-app");
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
            <GeneralWrapper>
              <BudgetWrapper>
                <BudgetHeader>Remaining budget:</BudgetHeader>
                {/* Need to dynamically fill the budget here using state */}
                <BudgetAmount>${budget}</BudgetAmount>
              </BudgetWrapper>
              <SectionWrapper>
                <Section color="#F0C8FF">
                  <SectionTitle>Budget</SectionTitle>
                  <SubmitButton>Manage budget</SubmitButton>
                </Section>
                <Section color="#C98EFF">
                  <SectionTitle>Prizes</SectionTitle>
                  <SubmitButton>Manage prizes</SubmitButton>
                </Section>
              </SectionWrapper>
            </GeneralWrapper>
            <ApplicationWrapper>
              <AppNoWrapper>
                <AppNoHeader>Total applications:</AppNoHeader>
                <AppNoAmount>0</AppNoAmount>
              </AppNoWrapper>
              <SectionWrapper>
                <Section color="#C9E4BC">
                  <SectionTitle>Application Creation</SectionTitle>
                  <SubmitButton onClick={createAppHandler}>
                    Create app
                  </SubmitButton>
                </Section>
                <Section color="#80BF9B">
                  <SectionTitle>Application Review</SectionTitle>
                  <SubmitButton>Review apps</SubmitButton>
                </Section>
              </SectionWrapper>
            </ApplicationWrapper>
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
