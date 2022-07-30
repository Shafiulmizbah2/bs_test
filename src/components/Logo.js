import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
`;
const Title = styled.h6`
  font-size: 2rem;
  font-weight: 300;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.white};
`;

const Logo = ({ title, navigate }) => {
  return (
    <Container onClick={navigate}>
      <Image src="./logo.png" />
      {title && <Title>{title}</Title>}
    </Container>
  );
};

export default Logo;
