package com.tallerpro.mapper;

import com.tallerpro.api.dto.orden.OrdenTrabajoCreateRequest;
import com.tallerpro.api.dto.orden.OrdenTrabajoResponse;
import com.tallerpro.domain.EstadoOrden;
import com.tallerpro.domain.OrdenTrabajo;
import com.tallerpro.domain.Vehiculo;
import com.tallerpro.api.mapper.LineaPiezaMapper;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", uses = { LineaPiezaMapper.class })
public interface OrdenTrabajoMapper {

    @Mapping(target = "vehiculo", source = "vehiculoId")
    @Mapping(target = "estado", expression = "java( request.estado() != null ? request.estado() : EstadoOrden.PENDIENTE )")
    @Mapping(target = "fechaEntrada", expression = "java( request.fechaEntrada() != null ? request.fechaEntrada() : LocalDateTime.now() )")
    @Mapping(target = "lineas", ignore = true) // se añaden por endpoint específico
    OrdenTrabajo toEntity(OrdenTrabajoCreateRequest request);

    @Mapping(target = "vehiculoId", source = "vehiculo.id")
    OrdenTrabajoResponse toResponse(OrdenTrabajo entity);

    List<OrdenTrabajoResponse> toResponseList(List<OrdenTrabajo> entities);

    // Helper Long -> Vehiculo
    default Vehiculo fromId(Long id) {
        if (id == null) return null;
        Vehiculo v = new Vehiculo();
        v.setId(id);
        return v;
    }
}
