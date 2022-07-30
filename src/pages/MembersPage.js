import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../components/Section";
import theme from "../theme";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import { addNewMember } from "../store/memberSlice";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background: ${(props) => (props.bgColor ? props.bgColor : "gray")};
  outline: none;
  border: none;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => (props.color ? props.color : "black")};
  border-radius: 0.5rem;
  width: ${(props) => (props.fullWidth ? "90%" : "auto")};
  margin: 1rem 0;
  text-transform: uppercase;
  cursor: pointer;
`;

const Title = styled.h4`
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  font-size: 2rem;
  text-transform: capitalize;
`;

const Member = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.gray};
`;

const MemberTitle = styled(Link)`
  font-size: 1.8rem;
  font-weight: 300;
  margin-right: 0.5rem;
  text-transform: capitalize;
  text-decoration: none;
  color: inherit;
`;

const Column = styled.p`
  font-size: 1.7rem;
  font-weight: 400;
  margin-right: 0.5rem;
`;

const MembersPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector((state) => state.member);
  const { tasks } = useSelector((state) => state.task);

  const toggleModal = () => setModalOpen(!modalOpen);

  //store state change of create form
  const handleChange = (e) => {
    //this func reads value from input & save them to state dynamically
    let value = e.target.value;
    let name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const res = dispatch(addNewMember(values.name.toLowerCase(), values.email));
    setValues({});
    if (res?.payload) setModalOpen(true);
    else setModalOpen(false);
  };

  const getAllTaskByMember = (name) => {
    const memberTasks = tasks.filter(
      (item) => item.assignTo.toLowerCase() === name
    );
    return memberTasks;
  };

  return (
    <>
      <Section>
        <Container>
          <TopContainer>
            <Title>Members</Title>
            <Button bgColor="none" color={theme.blue} onClick={toggleModal}>
              Create new member
            </Button>
          </TopContainer>
          <Container>
            <Member>
              <Column style={{ color: theme.black, fontWeight: 500 }}>
                Name
              </Column>
              <Column style={{ color: theme.black, fontWeight: 500 }}>
                No of tasks
              </Column>
            </Member>
            {members.map((item) => (
              <Member key={item.name}>
                <MemberTitle to={`/members/${item.id}`}>
                  {item.name}
                </MemberTitle>
                <Column>{getAllTaskByMember(item.name).length}</Column>
              </Member>
            ))}

            {members.length === 0 && (
              <Title
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "red",
                  marginTop: "2rem",
                }}
              >
                No Member found!
              </Title>
            )}
          </Container>
        </Container>
      </Section>
      {/* create task modal */}
      {modalOpen && (
        <Modal show={modalOpen} onClose={toggleModal}>
          <Form onSubmit={handleCreate}>
            <Form.Title title="Create new member" />
            {error && <Form.Label label={error} labelDanger />}

            <Form.Input
              placeholder="Member name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />

            <Form.Input
              placeholder="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />

            <Form.Button
              text={loading ? "Loading..." : "Add member"}
              bgColor={loading ? theme.gray : theme.blue}
              color={loading ? theme.black : theme.white}
              type="submit"
              onClick={handleCreate}
              disabled={loading}
            />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default MembersPage;
