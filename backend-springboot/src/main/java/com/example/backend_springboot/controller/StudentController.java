package com.example.backend_springboot.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
            Student existingStudent = this.studentRepository.findByEmailAndPassword(auth.getEmail(), auth.getPassword()).orElse(null);
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
    public ResponseDto applyNewStudent(@Param("staff_id") Long staff_id, @RequestBody Student newStudent) {
        ResponseDto response = new ResponseDto();
        try {
            Staff existingStaff = this.staffRepository.findById(staff_id).orElse(null);
            if (existingStaff == null) {
                throw new Exception("Given staff not exists");
            }
            newStudent.setStaff(existingStaff);
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
    public ResponseDto ApproveStudent(@Param("student_id") Long student_id, @Param("staff_id") Long staff_id) {
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
    public ResponseDto deleteStudent(@Param("student_id") Long student_id, @Param("staff_id") Long staff_id) {
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
