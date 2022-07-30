import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../components/Section";
import theme from "../theme";
import { addNewTask } from "../store/taskSlice";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { Link, useNavigate } from "react-router-dom";

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

const Task = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.gray};
`;

const Column = styled.div`
  width: 33.33%;
  font-size: 1.7rem;
  color: ${(props) => props.theme.gray}
  font-weight: 400;
`;

const TasksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { members } = useSelector((state) => state.member);

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
    const res = dispatch(
      addNewTask(values.title, values.description, values.assignTo)
    );
    setValues({});
    if (res?.payload) setModalOpen(true);
    else setModalOpen(false);
  };

  const options = members?.map((item) => ({
    id: item.id,
    value: item.name,
  }));

  return (
    <>
      <Section>
        <Container>
          <TopContainer>
            <Title>Tasks</Title>
            <Button bgColor="none" color={theme.blue} onClick={toggleModal}>
              Create new task
            </Button>
          </TopContainer>
          <Container>
            <Task>
              <Column style={{ color: theme.black, fontWeight: 500 }}>
                Tasks
              </Column>
              <Column style={{ color: theme.black, fontWeight: 500 }}>
                Creation date
              </Column>
              <Column style={{ color: theme.black, fontWeight: 500 }}>
                Assign to
              </Column>
            </Task>
            {tasks.map((item) => (
              <Task key={item.title}>
                <Column
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/tasks/${item.id}`)}
                >
                  {item.title}
                </Column>
                <Column>{item.createdAt}</Column>
                <Column>{item.assignTo}</Column>
              </Task>
            ))}

            {tasks.length === 0 && (
              <Title
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "red",
                  marginTop: "2rem",
                }}
              >
                No task found!
              </Title>
            )}
          </Container>
        </Container>
      </Section>
      {/* create task modal */}
      {modalOpen && (
        <Modal show={modalOpen} onClose={toggleModal}>
          <Form onSubmit={handleCreate}>
            <Form.Title title="Create new task" />
            {error && <Form.Label label={error} labelDanger />}

            <Form.Input
              placeholder="Title"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />

            <Form.Input
              placeholder="Description"
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
            <Form.Select
              placeholder="assignTo"
              type="text"
              name="assignTo"
              value={values.assignTo}
              onChange={handleChange}
              options={options}
              defaultValue="Assign to"
            />
            <Form.Button
              text={loading ? "Loading..." : "Add task"}
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

export default TasksPage;
