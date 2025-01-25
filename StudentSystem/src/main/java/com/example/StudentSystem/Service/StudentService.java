package com.example.StudentSystem.Service;

import com.example.StudentSystem.model.Student;

import java.util.List;


public interface StudentService {
    Student saveStudent(Student student);
    List<Student> getAllStudent();
    Student updateStudent(int id, Student studentDetails);  // New method
    void deleteStudent(int id);  // New method
}
