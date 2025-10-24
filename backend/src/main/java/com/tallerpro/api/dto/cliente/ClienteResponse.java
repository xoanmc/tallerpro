package com.tallerpro.api.dto.cliente;

public record ClienteResponse(
        Long id,
        String nombre,
        String telefono,
        String email
) {}
