package com.tallerpro.api.dto.orden;

import com.tallerpro.domain.EstadoOrden;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrdenTrabajoCreateRequest(
        @NotNull Long vehiculoId,
        @NotBlank String descripcionAveria,
        EstadoOrden estado,               // opcional: si es null, se asumirá PENDIENTE
        LocalDateTime fechaEntrada,      // opcional: si es null, ahora()
        BigDecimal costeEstimado
) {}
