import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  width: 100vw;
  min-height: 88vh;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 120rem;
  margin: 0 auto;
  padding: 2rem 0;
  overflow-x: hidden;
`;

const Section = ({ children }) => {
  return (
    <SectionContainer>
      <Container>{children}</Container>
    </SectionContainer>
  );
};

export default Section;
