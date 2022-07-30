import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Section from "../components/Section";
import { deleteMember, getMember, updateMember } from "../store/memberSlice";
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

const Task = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.gray};
`;

const Column = styled.p`
  width: 33.33%;
  font-size: 1.7rem;
  font-weight: 400;
`;

const MemberDetailsPage = () => {
  const [selectedMember, setSelectedMember] = useState({});
  const [membersTask, setMemberTask] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.task);
  const { members, loading, error } = useSelector((state) => state.member);

  //this toggle func show update modal
  const toggleUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };

  //store state change of update form
  const handleSelectedChange = (e) => {
    //this func reads value from input & save them to state dynamically
    let value = e.target.value;
    let name = e.target.name;
    setSelectedMember({ ...selectedMember, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMember(selectedMember));
    setSelectedMember({});
    if (!loading && !error) setUpdateModalOpen(false);
  };

  const handleDelete = () => {
    console.log(selectedMember.id);
    dispatch(deleteMember(selectedMember.id));
    navigate("/members", { replace: true });
  };

  const getAllTaskByMember = (name) => {
    const memberTasks = tasks.filter(
      (item) => item.assignTo.toLowerCase() === name
    );
    return memberTasks;
  };

  useEffect(() => {
    setSelectedMember(dispatch(getMember(memberId)));
  }, [memberId, members]);

  useEffect(() => {
    setMemberTask(getAllTaskByMember(selectedMember.name));
  }, [selectedMember]);

  return (
    <>
      <Section>
        <Container>
          <Container>
            <Container>
              <Title>Name : {selectedMember.name}</Title>
              <Others>Email : {selectedMember.email}</Others>
              <Actions>
                <Button
                  bgColor={theme.blue}
                  color={theme.white}
                  onClick={toggleUpdateModal}
                >
                  Update Member
                </Button>

                <Button
                  bgColor={theme.orange}
                  color={theme.white}
                  onClick={handleDelete}
                >
                  Delete Member
                </Button>
              </Actions>
            </Container>
            <Task>
              <Column>Task</Column>
              <Column>Creation date</Column>
              <Column>Description </Column>
            </Task>
            {membersTask.map((item) => (
              <Task key={item.title}>
                <Column>{item.title}</Column>
                <Column>{item.createdAt}</Column>
                <Column>{item.description}</Column>
              </Task>
            ))}

            {membersTask.length === 0 && (
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

      {/* update task modal */}
      {updateModalOpen && (
        <Modal show={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
          <Form onSubmit={handleUpdate}>
            <Form.Title title="Update task" />
            {error && <Form.Label label={error} labelDanger />}

            <Form.Input
              placeholder="Member name"
              type="text"
              name="name"
              value={selectedMember.name}
              onChange={handleSelectedChange}
            />

            <Form.Input
              placeholder="Email"
              type="email"
              name="email"
              value={selectedMember.email}
              onChange={handleSelectedChange}
            />

            <Form.Button
              text={loading ? "Loading..." : "Update Member"}
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

export default MemberDetailsPage;
