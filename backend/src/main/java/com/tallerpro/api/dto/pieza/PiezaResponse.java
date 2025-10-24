package com.tallerpro.api.dto.pieza;

import java.math.BigDecimal;

public record PiezaResponse(
        Long id,
        String nombre,
        String proveedor,
        BigDecimal precioUnitario,
        Integer stock
) {}
