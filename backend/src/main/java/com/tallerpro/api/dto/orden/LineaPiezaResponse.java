package com.tallerpro.api.dto.orden;

import java.math.BigDecimal;

public record LineaPiezaResponse(
        Long id,
        Long piezaId,
        Integer cantidad,
        BigDecimal precioUnitario,
        BigDecimal subtotal
) {}
