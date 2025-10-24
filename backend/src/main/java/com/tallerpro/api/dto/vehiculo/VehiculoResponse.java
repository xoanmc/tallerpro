package com.tallerpro.api.dto.vehiculo;

public record VehiculoResponse(
        Long id,
        Long clienteId,
        String matricula,
        String marca,
        String modelo,
        Integer anio
) {}
