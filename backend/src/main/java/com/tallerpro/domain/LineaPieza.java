package com.tallerpro.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name = "lineas_pieza")
public class LineaPieza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private OrdenTrabajo orden;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Pieza pieza;

    @Column(nullable = false)
    private Integer cantidad;

    /** Precio unitario aplicado en el momento (copia del de la pieza para mantener histórico). */
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitario;
}
