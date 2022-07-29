import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { HiMenuAlt1 } from "react-icons/hi";
import { GiTireIronCross } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/authSlice";

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  box-shadow: 0.2rem 0.5rem 0.7rem rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.white};
  overflow-x: hidden;
`;

const Nav = styled.nav`
  max-width: 120rem;
  padding: 1rem 0.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 880px) {
    justify-content: flex-start;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.ul`
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  transition: right 0.3s ease-in-out;

  @media only screen and (max-width: 880px) {
    height: 100vh;
    width: 20rem;
    position: absolute;
    right: 0;
    top: 0;
    flex-direction: column;
    justify-content: center;
    background-color: ${(props) => props.theme.secondary};
    z-index: 1000;
  }
`;

const Check = styled.input`
  display: none;
  :not(:checked) + ${RightContainer} {
    right: -20rem;
  }
`;

const Menu = styled.label`
  display: none;
  position: absolute;
  left: -5rem;
  top: 1rem;
  cursor: pointer;

  @media only screen and (max-width: 880px) {
    display: inline-block;
  }
`;

const StyledLink = styled.li`
  list-style: none;
  border: 2px solid transparent;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  & a,
  div,
  p {
    display: inline-block;
    text-decoration: none;
    color: ${(props) => props.theme.white};
    padding: 1rem 2rem;
    cursor: pointer;
  }

  @media only screen and (max-width: 880px) {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    & a,
    div,
    p {
      width: 100%;
    }
  }
`;

let activeStyle = {
  border: `2px solid #f9f9f9`,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (pathname === "/login") return null;

  return (
    <Container>
      <Nav>
        <LeftContainer>
          <Logo title="BS23_TEST" />
        </LeftContainer>

        {/* This checkbox toggle the sidebar(Right Container) based on checked or not */}
        <Check type="checkbox" id="menu" />

        <RightContainer>
          <Menu htmlFor="menu">
            <HiMenuAlt1 size={30} />
          </Menu>
          <StyledLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/"
            >
              Dashboard
            </NavLink>
          </StyledLink>
          <StyledLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/tasks"
            >
              Tasks
            </NavLink>
          </StyledLink>
          <StyledLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/members"
            >
              Members
            </NavLink>
          </StyledLink>
          <StyledLink onClick={() => dispatch(signOut())}>
            <div to="/members">Logout</div>
          </StyledLink>
          <StyledLink>
            <p style={{ cursor: "auto" }} to="/members">
              {user}
            </p>
          </StyledLink>
        </RightContainer>
      </Nav>
    </Container>
  );
};

export default Navbar;
