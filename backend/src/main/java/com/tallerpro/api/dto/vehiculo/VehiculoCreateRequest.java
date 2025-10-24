package com.tallerpro.api.dto.vehiculo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VehiculoCreateRequest(
        @NotNull Long clienteId,
        @NotBlank String matricula,
        @NotBlank String marca,
        @NotBlank String modelo,
        Integer anio
) {}
