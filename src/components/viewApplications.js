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

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const AppNoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 15%;
  margin: 0 150px 0 0;
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

const ApplicationGrid = styled.div`
  width: 55%;
  height: 300px;
  background: #f2f2f2;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px 50px;
  overflow-y: scroll;
`;

const GridTitles = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 25% 37.5% 37.5%;
  margin: 0 0 40px 0;
`;

const GridTitle = styled.p`
  color: #4f4f4f;
  font-family: Inter-Regular;
  font-size: 14px;
  margin: 0;
  align-self: bottom;
  justify-self: start;
`;

const ApplicationInfoWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 25% 37.5% 37.5%;
  margin: 0 0 40px 0;
`;

const ApplicationInfo = styled.p`
  color: black;
  font-family: Inter-Regular;
  font-size: 14px;
  margin: 0;
  align-self: center;
  justify-self: start;
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

export default function ViewApplications() {
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
            <Title>View all Applications</Title>
            <Wrapper>
              <AppNoWrapper>
                <AppNoHeader>Total Applications:</AppNoHeader>
                <AppNoAmount>0</AppNoAmount>
              </AppNoWrapper>
              <ApplicationGrid>
                <GridTitles>
                  <GridTitle>Number</GridTitle>
                  <GridTitle>Name</GridTitle>
                  <GridTitle>View Application</GridTitle>
                </GridTitles>
                <ApplicationInfoWrapper>
                  <ApplicationInfo>1</ApplicationInfo>
                  <ApplicationInfo>Udit Desai</ApplicationInfo>
                  <SubmitButton>View Application</SubmitButton>
                </ApplicationInfoWrapper>
                <ApplicationInfoWrapper>
                  <ApplicationInfo>1</ApplicationInfo>
                  <ApplicationInfo>Udit Desai</ApplicationInfo>
                  <SubmitButton>View Application</SubmitButton>
                </ApplicationInfoWrapper>
                <ApplicationInfoWrapper>
                  <ApplicationInfo>1</ApplicationInfo>
                  <ApplicationInfo>Udit Desai</ApplicationInfo>
                  <SubmitButton>View Application</SubmitButton>
                </ApplicationInfoWrapper>
                <ApplicationInfoWrapper>
                  <ApplicationInfo>1</ApplicationInfo>
                  <ApplicationInfo>Udit Desai</ApplicationInfo>
                  <SubmitButton>View Application</SubmitButton>
                </ApplicationInfoWrapper>
              </ApplicationGrid>
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
