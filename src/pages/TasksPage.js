import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../components/Section";
import theme from "../theme";
import { addNewTask } from "../store/taskSlice";
import Modal from "../components/Modal";
import Form from "../components/Form";

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
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.gray};
`;

const TaskTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 300;
  margin-right: 0.5rem;
  text-transform: capitalize;
`;

const TaskDesc = styled.p`
  font-size: 1.7rem;
  font-weight: 400;
  margin-right: 0.5rem;
`;

const TaskAssignTo = styled.p`
  font-size: 1.7rem;
  font-weight: 400;
  text-transform: uppercase;
`;

const TasksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleChange = (e) => {
    //this func reads value from input & save them to state dynamically

    let value = e.target.value;
    let name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTask(values.title, values.description, values.assignTo));
    setValues({});
    if (!loading && !error) toggleModal();
  };

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
              <TaskTitle>Task</TaskTitle>
              <TaskDesc style={{ textTransform: "uppercase" }}>
                Created at
              </TaskDesc>
              <TaskAssignTo>Assign to</TaskAssignTo>
            </Task>
            {tasks.map((item) => (
              <Task key={item.title}>
                <TaskTitle>{item.title}</TaskTitle>
                <TaskDesc>{item.createdAt}</TaskDesc>
                <TaskAssignTo>
                  {item.assignTo ? item.assignTo : "- - -"}
                </TaskAssignTo>
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
      {modalOpen && (
        <Modal show={modalOpen} onClose={toggleModal}>
          <Form onSubmit={handleSubmit}>
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
              options={[{ value: "Mr.Abc" }, { value: "Mr.Efg" }]}
              defaultValue="Assign to"
            />
            <Form.Button
              text={loading ? "Loading..." : "Add task"}
              bgColor={loading ? theme.gray : theme.blue}
              color={loading ? theme.black : theme.white}
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default TasksPage;
