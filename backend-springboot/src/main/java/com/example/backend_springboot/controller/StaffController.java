package com.example.backend_springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/staff")
@CrossOrigin
@RequiredArgsConstructor
public class StaffController {
    private final StudentRepository studentRepository;
    private final StaffRepository staffRepository;

    @PostMapping("/validate")
    public ResponseDto validateStudent(@RequestBody AuthDto auth) {
        ResponseDto response = new ResponseDto();
        try {
            Staff existingStaff = this.staffRepository.findByEmailAndPassword(auth.getEmail(), auth.getPassword()).orElse(null);
            if (existingStaff == null) {
                throw new Exception("Auth failed");
            }
            response.setSuccess(true);
            response.setMessage("Auth successful");
            response.setData(existingStaff);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @PostMapping("/create")
    public ResponseDto applyNewStudent(@RequestBody Staff newStaff) {
        ResponseDto response = new ResponseDto();
        try {
            Staff staff = this.staffRepository.save(newStaff);
            response.setSuccess(true);
            response.setMessage("created new student");
            response.setData(staff);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @GetMapping("/all/by/staff/{staff_id}")
    public ResponseDto getAllStudents(@Param("staff_id") Long staff_id) {
        ResponseDto response = new ResponseDto();
        try {
            List<Student> studentList = this.studentRepository.findAll();
            List<Student> li = new ArrayList<Student>();
            for (Student student : studentList) {
                if(student.getStaff().getId() == staff_id) {
                    li.add(student);
                }
            }
            response.setSuccess(true);
            response.setMessage("got the list");
            response.setData(li);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            response.setData(null);
        }
        return response;
    }
}
