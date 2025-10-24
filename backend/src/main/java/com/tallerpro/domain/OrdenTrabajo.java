package com.tallerpro.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name = "ordenes_trabajo")
public class OrdenTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Vehiculo vehiculo;

    @Column(nullable = false, length = 1000)
    private String descripcionAveria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private EstadoOrden estado;

    @Column(nullable = false)
    private LocalDateTime fechaEntrada;

    private LocalDateTime fechaCierre;

    @Column(precision = 12, scale = 2)
    private BigDecimal costeEstimado;

    @Column(precision = 12, scale = 2)
    private BigDecimal costeReal;

    @Builder.Default
    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LineaPieza> lineas = new ArrayList<>();
}
