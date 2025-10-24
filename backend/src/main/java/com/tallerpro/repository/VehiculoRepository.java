package com.tallerpro.repository;

import com.tallerpro.domain.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
    boolean existsByMatriculaIgnoreCase(String matricula);
    Optional<Vehiculo> findByMatriculaIgnoreCase(String matricula);
    List<Vehiculo> findByCliente_Id(Long clienteId);
}
