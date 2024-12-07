import React, { useState, useEffect } from 'react'
import '../styles/css/AssignProject.css'
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';

const jwtToken = localStorage.getItem("jwtToken");

const AssignProject = () => {
    const [projects, setProjects] = useState([]);
    const [assignees, setAssignees] = useState([]);

    const [formData, setFormData] = useState({
        id: 0,
        assigneeId: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects/assign`, formData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects?page=0&size=100`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                });
                setProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

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

        fetchProjects();
        fetchAssignees();
    }, []);

    return (
        <Container className='assignProjectForm'>
            <div className="assignProjectForm-title">Assign Project</div>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select aria-label="Project"
                        name='id'
                        value={formData.id}
                        onChange={handleChange}>
                        <option>Select Project</option>
                        {projects.map((project) => (
                            <option key={"project_" + project.id} value={project.id}>{project.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

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

export default AssignProject;