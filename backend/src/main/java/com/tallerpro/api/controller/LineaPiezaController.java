package com.tallerpro.api.controller;

import com.tallerpro.api.dto.orden.LineaPiezaCreateRequest;
import com.tallerpro.api.dto.orden.LineaPiezaResponse;
import com.tallerpro.service.LineaPiezaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/lineas")
@RequiredArgsConstructor
@Tag(name = "Líneas de piezas", description = "Gestión de las líneas de piezas asociadas a las órdenes de trabajo")
public class LineaPiezaController {

    private final LineaPiezaService lineaService;

    @Operation(summary = "Crear una nueva línea de pieza")
    @PostMapping
    public ResponseEntity<LineaPiezaResponse> crear(@Valid @RequestBody LineaPiezaCreateRequest request) {
        LineaPiezaResponse response = lineaService.crear(request);
        URI location = URI.create("/api/lineas/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "Obtener una línea de pieza por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<LineaPiezaResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(lineaService.obtener(id));
    }

    @Operation(summary = "Listar todas las líneas de una orden")
    @GetMapping("/orden/{ordenId}")
    public ResponseEntity<List<LineaPiezaResponse>> listarPorOrden(@PathVariable Long ordenId) {
        return ResponseEntity.ok(lineaService.listarPorOrden(ordenId));
    }

    @Operation(summary = "Eliminar una línea de pieza (repone el stock automáticamente)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        lineaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
