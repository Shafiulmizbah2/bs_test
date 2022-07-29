import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  width: 100%;
  min-height: 88vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Section = ({ children }) => {
  return (
    <SectionContainer>
      <Container>{children}</Container>
    </SectionContainer>
  );
};

export default Section;
