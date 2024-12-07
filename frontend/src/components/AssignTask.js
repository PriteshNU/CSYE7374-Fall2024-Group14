import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/css/AssignTask.css'
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import LeftNavigation from "./LeftNavigation";

const jwtToken = localStorage.getItem("jwtToken");

const AssignTask = () => {
    const { taskId } = useParams();
    const [assignees, setAssignees] = useState([]);

    const [formData, setFormData] = useState({
        id: taskId,
        assigneeId: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tasks/assign`, formData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200 && response.data.id > 0) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {


        const fetchAssignees = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                });
                setAssignees(response.data);
            } catch (error) {
                console.error('Error fetching assignees:', error);
            }
        };

        fetchAssignees();
    }, []);

    return (

        <Container className='assignProjectForm'>
            <div className="assignProjectForm-title">Assign Project</div>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect2">
                    <Form.Label>Select Assignee</Form.Label>
                    <Form.Select aria-label="Assignee"
                        name='assigneeId'
                        value={formData.assigneeId}
                        onChange={handleChange}>
                        <option>Select Assignee</option>
                        {assignees.map((assignee) => (
                            <option key={"assignee_" + assignee.id} value={assignee.id}>{`${assignee.firstname} ${assignee.lastname}`}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div className='Buttons'>
                    <Button variant='primary btn-lg' type='submit'>Assign</Button>
                    <Button variant='danger btn-lg' type='reset'>Cancel</Button>
                </div>
            </Form>
        </Container>
    )
}

export default AssignTask;