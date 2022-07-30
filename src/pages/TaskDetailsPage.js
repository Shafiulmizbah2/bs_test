import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Section from "../components/Section";
import { deleteTask, getTask, updateTask } from "../store/taskSlice";
import theme from "../theme";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: ${(props) => props.theme.grayDark};
`;

const Others = styled.p`
  font-size: 1.7rem;
  font-weight: 400;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 4rem;
  font-weight: 400;
  margin-right: 0.5rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const TaskDetailsPage = () => {
  const [selectedTask, setSelectedTask] = useState({});
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { members } = useSelector((state) => state.member);

  //this toggle func show update modal
  const toggleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };

  //store state change of update form
  const handleSelectedChange = (e) => {
    //this func reads value from input & save them to state dynamically
    let value = e.target.value;
    let name = e.target.name;
    setSelectedTask({ ...selectedTask, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask(selectedTask));
    setSelectedTask({});
    if (!loading && !error) setUpdateModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(selectedTask.id));
    navigate("/tasks", { replace: true });
  };

  useEffect(() => {
    setSelectedTask(dispatch(getTask(taskId)));
  }, [taskId, tasks]);

  const options = members?.map((item) => ({
    id: item.id,
    value: item.name,
  }));

  return (
    <>
      <Section>
        <Container>
          <Title>{selectedTask.title}</Title>
          <Others>{selectedTask.description}</Others>
          <Others>Created at : {selectedTask.createdAt}</Others>
          <Others>Assign to : {selectedTask.assignTo}</Others>
          <Actions>
            <Button
              bgColor={theme.blue}
              color={theme.white}
              onClick={toggleUpdateModal}
            >
              Update task
            </Button>

            <Button
              bgColor={theme.orange}
              color={theme.white}
              onClick={handleDelete}
            >
              Delete task
            </Button>
          </Actions>
        </Container>
      </Section>

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
              options={options}
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

export default TaskDetailsPage;
