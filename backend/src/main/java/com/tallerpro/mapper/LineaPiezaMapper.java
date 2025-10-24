package com.tallerpro.api.mapper;

import com.tallerpro.api.dto.orden.LineaPiezaCreateRequest;
import com.tallerpro.api.dto.orden.LineaPiezaResponse;
import com.tallerpro.domain.LineaPieza;
import com.tallerpro.domain.OrdenTrabajo;
import com.tallerpro.domain.Pieza;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public interface LineaPiezaMapper {

    @Mapping(target = "orden", source = "ordenId")
    @Mapping(target = "pieza", source = "piezaId")
    LineaPieza toEntity(LineaPiezaCreateRequest request);

    @Mapping(target = "piezaId", source = "pieza.id")
    @Mapping(
            target = "subtotal",
            expression = "java( entity.getPrecioUnitario() != null ? entity.getPrecioUnitario().multiply(java.math.BigDecimal.valueOf(entity.getCantidad())) : java.math.BigDecimal.ZERO )"
    )
    LineaPiezaResponse toResponse(LineaPieza entity);

    // Helpers: referencias por id
    default OrdenTrabajo ordenFromId(Long id) {
        if (id == null) return null;
        OrdenTrabajo o = new OrdenTrabajo();
        o.setId(id);
        return o;
    }

    default Pieza piezaFromId(Long id) {
        if (id == null) return null;
        Pieza p = new Pieza();
        p.setId(id);
        return p;
    }
}
