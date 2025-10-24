package com.tallerpro.api.controller;

import com.tallerpro.api.dto.pieza.PiezaCreateRequest;
import com.tallerpro.api.dto.pieza.PiezaResponse;
import com.tallerpro.service.PiezaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/piezas")
@RequiredArgsConstructor
@Tag(name = "Piezas", description = "Gestión del inventario de piezas del taller")
public class PiezaController {

    private final PiezaService piezaService;

    @Operation(summary = "Registrar una nueva pieza")
    @PostMapping
    public ResponseEntity<PiezaResponse> crear(@Valid @RequestBody PiezaCreateRequest request) {
        PiezaResponse response = piezaService.crear(request);
        URI location = URI.create("/api/piezas/" + response.id());
        return ResponseEntity.created(location).body(response);
    }

    @Operation(summary = "Obtener una pieza por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<PiezaResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(piezaService.obtener(id));
    }

    @Operation(summary = "Listar todas las piezas disponibles")
    @GetMapping
    public ResponseEntity<List<PiezaResponse>> listar() {
        return ResponseEntity.ok(piezaService.listar());
    }

    @Operation(summary = "Actualizar una pieza existente")
    @PutMapping("/{id}")
    public ResponseEntity<PiezaResponse> actualizar(@PathVariable Long id,
                                                    @Valid @RequestBody PiezaCreateRequest request) {
        return ResponseEntity.ok(piezaService.actualizar(id, request));
    }

    @Operation(summary = "Eliminar una pieza del inventario")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        piezaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Ajustar el stock de una pieza (positivo o negativo)")
    @PatchMapping("/{id}/stock")
    public ResponseEntity<PiezaResponse> ajustarStock(@PathVariable Long id, @RequestParam int cantidad) {
        return ResponseEntity.ok(piezaService.ajustarStock(id, cantidad));
    }
}
