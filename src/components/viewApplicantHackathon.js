import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Hackathon } from "./index.js";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  margin: 0 0 20px 0;
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

const SubmitButton = styled.button`
  width: fit-content;
  padding: 15px 20px;
  font-family: Inter-SemiBold;
  color: White;
  font-size: 14px;
  background: #333333;
  border-radius: 100px;
  margin: 0 0 20px 0;
  outline: none;
  border: none;
  cursor: pointer;
`;

const LoginText = styled.p`
  font-family: Inter-Regular;
  font-size: 14px;
  color: black;
  margin: 0 0px 0 0;
`;

const LoginLink = styled.span`
  font-family: Inter-SemiBold;
  font-size: 14px;
  color: black;
  margin: 0 0px 0 0;
  cursor: pointer;
`;

const FooterText = styled.p`
  position: absolute;
  bottom: 40px;
  font-family: Inter-Medium;
  font-size: 14px;
  color: black;
`;

export default function ViewApplicantHackathon() {
  let history = useHistory();

  let { hackID } = useParams();

  const goBack = () => {
    history.replace("/");
  };

  const applyHackathon = () => {
    history.push("/applicant/" + hackID + "/apply");
  };

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");

  useEffect(async () => {
    let hackathon_data = await Hackathon.getHackathonFromId(hackID);
    setName(hackathon_data.name);
    setLocation(hackathon_data.location);
    let startDate = new Date(
      hackathon_data.start.seconds * 1000
    ).toLocaleDateString();
    setStart(startDate);
    let endDate = new Date(
      hackathon_data.end.seconds * 1000
    ).toLocaleDateString();
    setEnd(endDate);
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Title>{name}</Title>
        <DateLocationWrapper>
          <HDate>
            {start} - {end}
          </HDate>
          <Location>{location}</Location>
        </DateLocationWrapper>
        <SubmitButton onClick={applyHackathon}>Apply</SubmitButton>
        <LoginText>
          Already applied? <LoginLink>Login</LoginLink> to go straight to the
          dashboard
        </LoginText>
      </ContentWrapper>
      <FooterText>
        Created with ❤️ using <LoginLink onClick={goBack}>Helpathon</LoginLink>
      </FooterText>
    </Container>
  );
}
