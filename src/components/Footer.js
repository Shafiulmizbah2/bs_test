import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondary};
  box-shadow: 0.2rem 0.5rem 0.7rem rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.white};
`;

const FooterContainer = styled.nav`
  max-width: 120rem;
  padding: 1rem 0.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === "/login") return null;

  return (
    <Container>
      <FooterContainer>@copyright 2022</FooterContainer>
    </Container>
  );
};

export default Footer;
