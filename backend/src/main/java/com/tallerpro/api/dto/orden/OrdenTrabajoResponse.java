package com.tallerpro.api.dto.orden;

import com.tallerpro.domain.EstadoOrden;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrdenTrabajoResponse(
        Long id,
        Long vehiculoId,
        String descripcionAveria,
        EstadoOrden estado,
        LocalDateTime fechaEntrada,
        LocalDateTime fechaCierre,
        BigDecimal costeEstimado,
        BigDecimal costeReal,
        List<LineaPiezaResponse> lineas
) {}
