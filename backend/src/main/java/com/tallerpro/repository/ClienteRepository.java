package com.tallerpro.repository;

import com.tallerpro.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmailIgnoreCase(String email);
    Optional<Cliente> findByEmailIgnoreCase(String email);
}
