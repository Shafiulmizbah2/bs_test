import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import { FaEnvelope } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import theme from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.white};
`;

const LoginPage = () => {
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    //this func reads value from input & save them to state dynamically

    let value = e.target.value;
    let name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(values.email, values.password));
  };

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Title title="Login" />
        {error && <Form.Label label={error} labelDanger />}

        <Form.Input
          Icon={<FaEnvelope size={17} color="#37474F" />}
          placeholder="Email Address"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />

        <Form.Input
          Icon={<BsGearFill size={17} color="#37474F" />}
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Form.Button
          text={loading ? "Loading..." : "Log in"}
          bgColor={loading ? theme.gray : theme.blue}
          color={loading ? theme.black : theme.white}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        />
      </Form>
    </Container>
  );
};

export default LoginPage;
