import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper,Button } from '@mui/material';


export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const[name,SetName] =React.useState('')
  const[address,SetAddress] =React.useState('')
  const[student,SetStudent] =React.useState([])



  const handleClick =(e)=>{
    e.preventDefault()
    const student = {name,address};
    console.log(student);
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

    }).then(()=>{
      console.log("New Student Added")
    })
  }

  React.useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res =>res.json())
    .then((result)=>{
      SetStudent(result)
    })
  },[])

  return (
    <Container>
      <Paper elevation={5} style={paperStyle}>
        <h1 style={{ color:"blue" }}>Add Student</h1>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
          value={name}
          onChange={(e)=>SetName(e.target.value)}/>
          
          
          <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
          value={address}
          onChange={(e)=>SetAddress(e.target.value)} />

          <Button variant="contained" color="success" onClick={handleClick}>
            Save
          </Button>
          <Paper elevation={3} style={paperStyle}>
            <h1>Student</h1>

            {student.map(student=>(
             
             <Paper elevation={6} style={{ margin:"10px",padding:"15px",textAlign:"left"  }}
             key={student.id}>
              id:{student.id}<br/>
              name:{student.name}<br/>
              address:{student.address}

             </Paper>

            ))}
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
}
