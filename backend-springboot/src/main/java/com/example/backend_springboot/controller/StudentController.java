package com.example.backend_springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_springboot.dto.AuthDto;
import com.example.backend_springboot.dto.ResponseDto;
import com.example.backend_springboot.model.Staff;
import com.example.backend_springboot.model.Student;
import com.example.backend_springboot.repository.StaffRepository;
import com.example.backend_springboot.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/student")
@CrossOrigin
@RequiredArgsConstructor
public class StudentController {
    private final StudentRepository studentRepository;
    private final StaffRepository staffRepository;

    @PostMapping("/validate")
    public ResponseDto validateStudent(@RequestBody AuthDto auth) {
        ResponseDto response = new ResponseDto();
        try {
            Student existingStudent = this.studentRepository.findByEmail(auth.getEmail()).orElse(null);
            if (existingStudent == null) {
                throw new Exception("Auth failed");
            }
            response.setSuccess(true);
            response.setMessage("Auth successful");
            response.setData(existingStudent);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @PostMapping("/apply/{staff_id}")
    public ResponseDto applyNewStudent(@PathVariable("staff_id") Long staff_id, @RequestBody AuthDto auth) {
        ResponseDto response = new ResponseDto();
        try {
            Staff existingStaff = this.staffRepository.findById(staff_id).orElse(null);
            if (existingStaff == null) {
                throw new Exception("Given staff not exists");
            }
            Student newStudent = new Student();
            newStudent.setEmail(auth.getEmail());
            newStudent.setPassword(auth.getPassword());
            newStudent.setStaff(existingStaff);
            newStudent.set_approved(false);
            newStudent.set_deleted(false);
            this.studentRepository.save(newStudent);
            response.setSuccess(true);
            response.setMessage("created new student");
            response.setData(newStudent);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @PostMapping("/approve/{student_id}/{staff_id}")
    public ResponseDto ApproveStudent(@PathVariable("student_id") Long student_id, @PathVariable("staff_id") Long staff_id) {
        ResponseDto response = new ResponseDto();
        try {
            Student existingStudent = this.studentRepository.findById(student_id).orElse(null);
            if (existingStudent == null) {
                throw new Exception("student id not exists");
            }
            if (existingStudent.getStaff().getId() != staff_id) {
                throw new Exception("student with staff id not matching");
            }
            existingStudent.set_approved(true);
            this.studentRepository.save(existingStudent);
            response.setSuccess(true);
            response.setMessage("approved successfully");
            response.setData(existingStudent);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @DeleteMapping("/soft-delete/{student_id}/{staff_id}")
    public ResponseDto deleteStudent(@PathVariable("student_id") Long student_id, @PathVariable("staff_id") Long staff_id) {
        ResponseDto response = new ResponseDto();
        try {
            Student existingStudent = this.studentRepository.findById(student_id).orElse(null);
            if (existingStudent == null) {
                throw new Exception("student id not exists");
            }
            if (existingStudent.getStaff().getId() != staff_id) {
                throw new Exception("student with staff id not matching");
            }
            existingStudent.set_deleted(true);
            this.studentRepository.save(existingStudent);
            response.setSuccess(true);
            response.setMessage("removed successfully");
            response.setData(existingStudent);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }

}
