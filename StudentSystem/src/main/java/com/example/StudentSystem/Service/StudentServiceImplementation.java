package com.example.StudentSystem.Service;

import com.example.StudentSystem.Repository.StudentRepo;
import com.example.StudentSystem.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImplementation implements StudentService {

    @Autowired
    private StudentRepo studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    // PUT method for updating an existing student
    @Override
    public Student updateStudent(int id, Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setName(studentDetails.getName());
            student.setAddress(studentDetails.getAddress());
            // Any other fields you want to update
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student not found with id " + id);
        }
    }

    // DELETE method for deleting a student by ID
    @Override
    public void deleteStudent(int id) {
        Optional<Student> optionalStudent = studentRepository.findById(id);

        if (optionalStudent.isPresent()) {
            studentRepository.delete(optionalStudent.get());
        } else {
            throw new RuntimeException("Student not found with id " + id);
        }
    }
}
