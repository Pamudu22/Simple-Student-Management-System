package com.example.StudentSystem.Controller;

import com.example.StudentSystem.Service.StudentService;
import com.example.StudentSystem.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New Student Added";
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents() {
        return studentService.getAllStudent();
    }

    // PUT mapping to update an existing student
    @PutMapping("/update/{id}")
    public String updateStudent(@PathVariable("id") int id, @RequestBody Student studentDetails) {
        Optional<Student> updatedStudent = Optional.ofNullable(studentService.updateStudent(id, studentDetails));
        return updatedStudent.isPresent() ? "Student updated successfully!" : "Student not found!";
    }

    // DELETE mapping to delete a student by ID
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable("id") int id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully!";
    }
}
