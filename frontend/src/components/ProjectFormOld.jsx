// MyForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const jwtToken = localStorage.getItem("jwtToken");

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects/import`,
          formData, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        if (response.status === 200 && response.data.id > 0) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // 
      fetch('http://localhost:8080/api/v1/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((data) => {console.log(data)
        alert('Project Created !')})
        .catch((error) => console.error('Error:', error));
    }
  };

  const headingStyle = {
    fontFamily: 'Arial Bold',
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const subheadingStyle = {
    fontFamily: 'Arial Bold',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '20px',

  };

  return (
    <div>
      <Typography variant="h3" style={headingStyle} gutterBottom>
        NEW PROJECT
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Project Description"
          variant="outlined"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography variant="h4" style={subheadingStyle} gutterBottom>
          <center>OR</center>
        </Typography>
        <Divider style={{ margin: '20px 0', backgroundColor: 'grey' }} />
        <Typography variant="h5" style={headingStyle} gutterBottom>
          Upload a CSV File
        </Typography>
        <div>
          <input
            accept=".csv"
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <Typography variant="h6" style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Sample CSV Format:
          </Typography>
          <TextField
            multiline
            fullWidth
            value={`Project Name, Project Description\nSales Forecasting, Predicting future sales of a retail company`}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <div style={{ marginTop: '20px' }} />
          <label htmlFor="fileInput">
            <Button component="span" variant="contained" color="primary">
              Upload
            </Button>
          </label>
          {file && <Typography variant="body2">{file.name}</Typography>}
        </div>
        <div style={{ marginTop: '20px' }} />
        <center>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            SUBMIT
          </Button>
        </center>
      </form>
    </div>
  );
};

export default ProjectForm;
