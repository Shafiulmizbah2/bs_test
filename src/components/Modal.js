import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: auto;
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Close = styled.p`
  position: fixed;
  top: 1rem;
  right: 2rem;
  font-size: 3rem;
  color: ${(props) => props.theme.white};
  cursor: pointer;
`;

const Modal = ({ show, children, onClose, ...rest }) => {
  return (
    <Container show={show} {...rest}>
      <Close onClick={onClose}>X</Close>
      {children}
    </Container>
  );
};

export default Modal;
