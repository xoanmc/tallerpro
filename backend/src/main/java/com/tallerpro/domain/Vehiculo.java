package com.tallerpro.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name = "vehiculos", indexes = {
        @Index(name = "idx_vehiculo_matricula", columnList = "matricula", unique = true)
})
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Cliente cliente;

    @Column(nullable = false, length = 12)
    private String matricula;

    @Column(nullable = false) private String marca;
    @Column(nullable = false) private String modelo;
    private Integer anio;

    @Builder.Default
    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrdenTrabajo> ordenes = new ArrayList<>();
}

