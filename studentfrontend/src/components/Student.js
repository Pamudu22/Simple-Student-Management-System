import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [students, setStudents] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, address };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/student/update/${currentId}`, student);
        console.log("Student Updated");
      } else {
        await axios.post("http://localhost:8080/student/add", student);
        console.log("New Student Added");
      }
      setIsEditing(false);
      setName('');
      setAddress('');
      setCurrentId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error submitting student:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/student/getAll");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/student/delete/${id}`);
      console.log("Student Deleted");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find(student => student.id === id);
    if (studentToEdit) {
      setName(studentToEdit.name);
      setAddress(studentToEdit.address);
      setCurrentId(id);
      setIsEditing(true);
    }
  };

  return (
    <Container>
      <Paper elevation={5} style={paperStyle}>
        <h1 style={{ color: "blue" }}>{isEditing ? "Edit Student" : "Add Student"}</h1>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField 
            label="Student Name" 
            variant="outlined" 
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />

          <TextField 
            label="Student Address" 
            variant="outlined" 
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)} 
          />

          <Button variant="contained" color={isEditing ? "primary" : "success"} type="submit">
            {isEditing ? "Update" : "Save"}
          </Button>

          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table aria-label="student table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(student.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(student.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
}
