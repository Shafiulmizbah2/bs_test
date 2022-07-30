import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Section from "../components/Section";
import theme from "../theme";
import { addNewTask, getTask, updateTask } from "../store/taskSlice";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

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

const TaskTitle = styled(Link)`
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

const HeaderTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  margin-right: 0.5rem;
  text-transform: capitalize;
`;

const TasksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [values, setValues] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);

  const toggleModal = () => setModalOpen(!modalOpen);

  //this toggle func get the selected task & show update modal
  const toggleUpdateModal = (id) => {
    const task = dispatch(getTask(id));
    if (task) {
      setSelectedTask(() => task);
      setUpdateModalOpen(!updateModalOpen);
    }
  };

  //store state change of create form
  const handleChange = (e) => {
    //this func reads value from input & save them to state dynamically
    let value = e.target.value;
    let name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  //store state change of update form
  const handleSelectedChange = (e) => {
    //this func reads value from input & save them to state dynamically
    let value = e.target.value;
    let name = e.target.name;
    setSelectedTask({ ...selectedTask, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(addNewTask(values.title, values.description, values.assignTo));
    setValues({});
    if (!loading && !error) toggleModal();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask(selectedTask));
    setSelectedTask({});
    if (!loading && !error) setUpdateModalOpen(false);
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
              <HeaderTitle>Task</HeaderTitle>
              <Column>Update Task</Column>
            </Task>
            {tasks.map((item) => (
              <Task key={item.title}>
                <TaskTitle to={`/tasks/${item.id}`}>{item.title}</TaskTitle>
                <Column onClick={() => toggleUpdateModal(item.id)}>
                  <MdEdit />
                </Column>
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
              options={[{ value: "Mr.Abc" }, { value: "Mr.Efg" }]}
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
      {/* update task modal */}

      {updateModalOpen && (
        <Modal show={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
          <Form onSubmit={handleUpdate}>
            <Form.Title title="Update task" />
            {error && <Form.Label label={error} labelDanger />}

            <Form.Input
              placeholder="Title"
              type="text"
              name="title"
              value={selectedTask.title}
              onChange={handleSelectedChange}
            />

            <Form.Input
              placeholder="Description"
              type="text"
              name="description"
              value={selectedTask.description}
              onChange={handleSelectedChange}
            />
            <Form.Select
              placeholder="assignTo"
              type="text"
              name="assignTo"
              value={selectedTask.assignTo}
              onChange={handleSelectedChange}
              options={[{ value: "Mr.Abc" }, { value: "Mr.Efg" }]}
              defaultValue="Assign to"
            />
            <Form.Button
              text={loading ? "Loading..." : "Update task"}
              bgColor={loading ? theme.gray : theme.blue}
              color={loading ? theme.black : theme.white}
              type="submit"
              onClick={handleUpdate}
              disabled={loading}
            />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default TasksPage;
