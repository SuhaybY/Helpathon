import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetUsers } from "./";
import { Hackathon } from "./index.js";
import firestore from "./Firestore.js";
import { Redirect, Link } from "react-router-dom";
import produce, { product } from "immer";

import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  width: 50%;
  height: 500px;
  overflow-y: scroll;
  border-radius: 10px;
  background: #f2f2f2;
  top: 150px;
  left: 25%;
  z-index: 3;
  box-sizing: border-box;
  padding: 40px 60px 40px 60px;
`;

const ModalTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 40px 0;
`;

const ModalTitle = styled.h3`
  font-family: Inter-Bold;
  font-size: 24px;
  color: black;
  margin: 0;
`;

const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 30px 0;
`;

const ModalQ = styled.p`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #828282;
  margin: 0 0 10px 0;
`;

const ModalA = styled.p`
  font-family: Inter-Regular;
  font-size: 14px;
  color: black;
  margin: 0 0 10px 0;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
  opacity: 0.8;
  position: fixed;
  z-index: 2;
`;

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

const AcceptButton = styled.button`
  width: fit-content;
  padding: 15px 20px;
  font-family: Inter-SemiBold;
  color: White;
  font-size: 14px;
  background: #27ae60;
  border-radius: 100px;
  margin: 0 0 0 0;
  outline: none;
  border: none;
  cursor: pointer;
`;

const RejectButton = styled.button`
  width: fit-content;
  padding: 15px 20px;
  font-family: Inter-SemiBold;
  color: White;
  font-size: 14px;
  background: #eb5757;
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

  const [viewIndApp, setViewIndApp] = useState(false);
  const [appNo, setAppNo] = useState();
  const [appKey, setAppKey] = useState();

  let { hackID } = useParams();
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();

  const [allApps, setAllApps] = useState({});

  const db = firestore.firestore();
  const hackRef = db.collection("hackathons").doc(hackID);
  const userRef = db.collection("users");
  const [users, setUsers] = useState([]);
  const [rsvpOnly, setRSVP] = useState(false);
  let hackathon = new Hackathon({ id: hackID });

  const [appObj, setAppObj] = useState({});

  const fetchHackathonData = async () => {
    let hackathon_data = await Hackathon.getHackathonFromId(hackID);
    setName(hackathon_data.name);
    setQuestions(hackathon_data.questions);
  };

  useEffect(() => {
    fetchHackathonData();
  }, []);

  function getRegistered(tHackUsers) {
    setUsers([]);
    // Query the obtained users now
    tHackUsers.forEach(function (entry) {
      userRef
        .doc(entry[0])
        .get()
        .then(function (querySnapshot) {
          setUsers((users) => [
            ...users,
            { ...querySnapshot.data(), id: querySnapshot.id, status: entry[1] },
          ]);
          console.log(users);
        });
    });
  }

  //UseEffect for an updated, registered user
  useEffect(() => {
    const getRealtimeHackathonUpdates = hackRef.onSnapshot(function (doc) {
      var tHackUsers = [];
      console.log(doc.data());
      let apps = doc.data().applications;
      setAppObj(() => {
        return { ...apps };
      });
      console.log(appObj);
      Object.keys(apps).forEach(function (key) {
        tHackUsers.push([key, apps[key]]);
      });
      getRegistered(tHackUsers);
    });
    return () => {
      getRealtimeHackathonUpdates();
    };
  }, []);

  const appsRef = useRef(appObj);
  useEffect(() => {
    appsRef.current = appObj;
  }, [appObj]);

  const goBack = () => {
    setLoggedin(false);
  };

  const appsHTML = Object.keys(appsRef.current).map((key, index) => {
    return (
      <ApplicationInfoWrapper>
        <ApplicationInfo>{index + 1}</ApplicationInfo>
        <ApplicationInfo>{key}</ApplicationInfo>
        <SubmitButton
          onClick={() => {
            setViewIndApp(true);
            setAppNo(index + 1);
            setAppKey(key);
          }}
        >
          View Application
        </SubmitButton>
      </ApplicationInfoWrapper>
    );
  });

  const handleAccept = () => {
    let h = new Hackathon({ id: hackID });
    h.acceptReject(appKey, true);
  };
  const handleReject = () => {
    let h = new Hackathon({ id: hackID });
    h.acceptReject(appKey, false);
  };

  return (
    <>
      {loggedIn === true ? (
        <>
          {viewIndApp === true ? (
            <>
              <Modal>
                <ModalTitleWrapper>
                  <ModalTitle>Application No. {appNo}</ModalTitle>
                  <AcceptButton onClick={handleAccept}>Accept</AcceptButton>
                  <RejectButton onClick={handleReject}>Reject</RejectButton>
                </ModalTitleWrapper>
                {appsRef.current[appKey].answers.map((answer, i) => {
                  return (
                    <QAWrapper>
                      <ModalQ>{questions[i]}</ModalQ>
                      <ModalA>{answer}</ModalA>
                    </QAWrapper>
                  );
                })}
              </Modal>
              <Overlay
                onClick={() => {
                  setViewIndApp(false);
                }}
              ></Overlay>
            </>
          ) : (
            <></>
          )}
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
                <AppNoAmount>{Object.keys(appsRef.current).length}</AppNoAmount>
              </AppNoWrapper>
              <ApplicationGrid>
                <GridTitles>
                  <GridTitle>Number</GridTitle>
                  <GridTitle>ID</GridTitle>
                  <GridTitle>View Application</GridTitle>
                </GridTitles>
                {appsHTML}
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
