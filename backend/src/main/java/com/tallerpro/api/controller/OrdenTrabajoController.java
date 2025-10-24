package com.tallerpro.api.controller;

import com.tallerpro.api.dto.orden.LineaPiezaCreateRequest;
import com.tallerpro.api.dto.orden.LineaPiezaResponse;
import com.tallerpro.api.dto.orden.OrdenTrabajoCreateRequest;
import com.tallerpro.api.dto.orden.OrdenTrabajoResponse;
import com.tallerpro.domain.EstadoOrden;
import com.tallerpro.service.OrdenTrabajoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/ordenes")
@RequiredArgsConstructor
@Tag(name = "Órdenes de trabajo", description = "Gestión de órdenes de reparación y mantenimiento")
public class OrdenTrabajoController {

    private final OrdenTrabajoService ordenService;

    @Operation(summary = "Crear una nueva orden de trabajo")
    @PostMapping
    public ResponseEntity<OrdenTrabajoResponse> crear(@Valid @RequestBody OrdenTrabajoCreateRequest request) {
        OrdenTrabajoResponse response = ordenService.crear(request);
        URI location = URI.create("/api/ordenes/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "Obtener una orden de trabajo por ID")
    @GetMapping("/{id}")
    public ResponseEntity<OrdenTrabajoResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(ordenService.obtener(id));
    }

    @Operation(summary = "Listar órdenes asociadas a un vehículo")
    @GetMapping("/vehiculo/{vehiculoId}")
    public ResponseEntity<List<OrdenTrabajoResponse>> listarPorVehiculo(@PathVariable Long vehiculoId) {
        return ResponseEntity.ok(ordenService.listarPorVehiculo(vehiculoId));
    }

    @Operation(summary = "Cambiar el estado de una orden")
    @PatchMapping("/{id}/estado")
    public ResponseEntity<OrdenTrabajoResponse> cambiarEstado(@PathVariable Long id,
                                                              @RequestParam EstadoOrden nuevoEstado) {
        return ResponseEntity.ok(ordenService.cambiarEstado(id, nuevoEstado));
    }

    @Operation(summary = "Fijar el coste real de una orden")
    @PatchMapping("/{id}/coste")
    public ResponseEntity<OrdenTrabajoResponse> fijarCosteReal(@PathVariable Long id,
                                                               @RequestParam BigDecimal costeReal) {
        return ResponseEntity.ok(ordenService.fijarCosteReal(id, costeReal));
    }

    @Operation(summary = "Agregar una línea de pieza a una orden existente")
    @PostMapping("/{id}/lineas")
    public ResponseEntity<LineaPiezaResponse> agregarLinea(@PathVariable Long id,
                                                           @Valid @RequestBody LineaPiezaCreateRequest request) {
        // Forzamos el id de la orden si no viene en el request
        LineaPiezaCreateRequest req = new LineaPiezaCreateRequest(id, request.piezaId(), request.cantidad());
        LineaPiezaResponse response = ordenService.agregarLinea(req);
        URI location = URI.create("/api/ordenes/" + id + "/lineas/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "Eliminar una orden (solo si no está finalizada)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ordenService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
