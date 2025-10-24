package com.tallerpro.api.controller;

import com.tallerpro.api.dto.vehiculo.VehiculoCreateRequest;
import com.tallerpro.api.dto.vehiculo.VehiculoResponse;
import com.tallerpro.service.VehiculoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
@RequiredArgsConstructor
@Tag(name = "Vehículos", description = "Gestión de vehículos asociados a clientes")
public class VehiculoController {

    private final VehiculoService vehiculoService;

    @Operation(summary = "Registrar un nuevo vehículo")
    @PostMapping
    public ResponseEntity<VehiculoResponse> crear(@Valid @RequestBody VehiculoCreateRequest request) {
        VehiculoResponse response = vehiculoService.crear(request);
        URI location = URI.create("/api/vehiculos/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "Obtener un vehículo por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<VehiculoResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculoService.obtener(id));
    }

    @Operation(summary = "Listar vehículos de un cliente específico")
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<VehiculoResponse>> listarPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(vehiculoService.listarPorCliente(clienteId));
    }

    @Operation(summary = "Actualizar datos de un vehículo existente")
    @PutMapping("/{id}")
    public ResponseEntity<VehiculoResponse> actualizar(@PathVariable Long id,
                                                       @Valid @RequestBody VehiculoCreateRequest request) {
        return ResponseEntity.ok(vehiculoService.actualizar(id, request));
    }

    @Operation(summary = "Eliminar un vehículo (si no tiene órdenes asociadas)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        vehiculoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
