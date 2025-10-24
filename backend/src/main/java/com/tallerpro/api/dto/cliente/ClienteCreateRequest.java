package com.tallerpro.api.dto.cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteCreateRequest(
        @NotBlank String nombre,
        String telefono,
        @Email @NotBlank String email
) {}
