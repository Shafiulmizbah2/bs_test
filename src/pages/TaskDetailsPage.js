import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Section from "../components/Section";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  console.log(taskId);
  return (
    <Section>
      <Container>TaskDetailsPage</Container>
    </Section>
  );
};

export default TaskDetailsPage;
