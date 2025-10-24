package com.tallerpro.api.dto.orden;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record LineaPiezaCreateRequest(
        @NotNull Long ordenId,
        @NotNull Long piezaId,
        @NotNull @Min(1) Integer cantidad,
        @NotNull BigDecimal precioUnitario // se fija al crear (histórico)
) {}
