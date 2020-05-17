import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firestore from "./Firestore.js";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 70px;
  background: #bb6bd9;
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.p`
  font-family: Inter-Bold;
  color: black;
  font-size: 24px;
  margin: 0%;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: Inter-Bold;
  color: black;
  font-size: 36px;
  margin: 70px 0 50px 40px;
`;

const HackathonsGrid = styled.div`
  width: calc(100% - 80px);
  margin: 0 auto 100px auto;
  height: fit-content;
  display: grid;
  grid-template-columns: 40% 40%;
  grid-gap: 50px 5%;
`;

const HackathonWrapper = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px;
`;

const HackathonContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const HackathonName = styled.p`
  font-family: Inter-SemiBold;
  color: black;
  font-size: 32px;
  margin: 0px 0 10px 0px;
`;

const HackathonDate = styled.p`
  font-family: Inter-Regular;
  color: black;
  font-size: 16px;
  margin: 0px 0 10px 0px;
`;

const HackathonLocation = styled.p`
  font-family: Inter-Regular;
  color: black;
  font-size: 16px;
  margin: 0px 0 0 0px;
`;

const HackathonButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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

export default function AllHackathons() {
  //Connect to the db
  const db = firestore.firestore();
  const docRef = db.collection("hackathons");
  const [hackathons, setHackathons] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getRealtimeUpdates = docRef.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const allHackathons = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHackathons(allHackathons);
        console.log("Refreshed info from Firestore database! All users:");
        console.log(allHackathons);
      }
    );
    return () => {
      getRealtimeUpdates();
    };
  }, []);

  const viewHackathon = (hackID) => {
    history.push("/applicant/" + hackID);
  };

  const createHackathon = () => {
    history.push("/hackathon");
  };

  const joinHackathon = (hackID) => {
    history.push("/applicant/" + hackID);
  };

  const hackathonsHTML = hackathons.map((hackathon) => {
    console.log(hackathon);
    let startDate = new Date(
      hackathon.start.seconds * 1000
    ).toLocaleDateString();
    let endDate = new Date(hackathon.end.seconds * 1000).toLocaleDateString();
    return (
      <HackathonWrapper key={hackathon.id}>
        <HackathonContent>
          <HackathonName>{hackathon.name}</HackathonName>
          <HackathonDate>
            {startDate} - {endDate}
          </HackathonDate>
          <HackathonLocation>{hackathon.location}</HackathonLocation>
        </HackathonContent>
        <HackathonButtonWrapper>
          <SubmitButton onClick={() => viewHackathon(hackathon.id)}>
            View Hackathon
          </SubmitButton>
        </HackathonButtonWrapper>
        {/* <button onClick={() => joinHackathon(hackathon.id)}>Register</button>{" "}
         */}
      </HackathonWrapper>
    );
  });

  const goBack = () => {
    history.push("/");
  };

  return (
    <>
      <Header>
        <HeaderTitle onClick={goBack}>Helpathon</HeaderTitle>
      </Header>
      <Title>All Hackathons</Title>
      <HackathonsGrid>
        {/* <button onClick={() => createHackathon()}>Create Hackathon</button> */}
        {hackathonsHTML}
      </HackathonsGrid>
    </>
  );
}
