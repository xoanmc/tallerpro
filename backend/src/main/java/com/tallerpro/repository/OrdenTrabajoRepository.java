package com.tallerpro.repository;

import com.tallerpro.domain.OrdenTrabajo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrdenTrabajoRepository extends JpaRepository<OrdenTrabajo, Long> {

    List<OrdenTrabajo> findByVehiculo_Id(Long vehiculoId);

    @EntityGraph(attributePaths = { "vehiculo", "lineas", "lineas.pieza" })
    Optional<OrdenTrabajo> findWithLineasById(Long id);
}
