import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Section from "../components/Section";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 500px) {
    justify-content: center;
  }
`;

const TileButton = styled.div`
  height: 20rem;
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.whiteOrg};
  outline: none;
  border: none;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.grayDark};
  border-radius: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0.3rem 0.5rem 0.7rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  &:not(:last-child) {
    margin-right: 1.5rem;

    @media only screen and (max-width: 500px) {
      margin-right: 0;
    }
  }
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <Container>
        <TileButton onClick={() => navigate("/tasks", { replace: true })}>
          Tasks
        </TileButton>
        <TileButton onClick={() => navigate("/members", { replace: true })}>
          Members
        </TileButton>
      </Container>
    </Section>
  );
};

export default DashboardPage;
