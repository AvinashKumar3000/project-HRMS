package com.example.backend_springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend_springboot.model.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmailAndPassword(String email, String password);
    Optional<Staff> findByEmail(String email);
}
