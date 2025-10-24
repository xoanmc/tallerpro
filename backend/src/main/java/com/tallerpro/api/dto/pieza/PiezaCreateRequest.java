package com.tallerpro.api.dto.pieza;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PiezaCreateRequest(
        @NotBlank String nombre,
        String proveedor,
        @NotNull BigDecimal precioUnitario,
        @NotNull @Min(0) Integer stock
) {}
