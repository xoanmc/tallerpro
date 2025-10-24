package com.tallerpro.service;

import com.tallerpro.api.dto.orden.LineaPiezaCreateRequest;
import com.tallerpro.api.dto.orden.LineaPiezaResponse;
import com.tallerpro.api.dto.orden.OrdenTrabajoCreateRequest;
import com.tallerpro.api.dto.orden.OrdenTrabajoResponse;
import com.tallerpro.domain.*;
import com.tallerpro.mapper.LineaPiezaMapper;
import com.tallerpro.mapper.OrdenTrabajoMapper;
import com.tallerpro.repository.*;
import com.tallerpro.service.exception.BadRequestException;
import com.tallerpro.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdenTrabajoService {

    private final OrdenTrabajoRepository ordenRepository;
    private final VehiculoRepository vehiculoRepository;
    private final PiezaRepository piezaRepository;
    private final LineaPiezaRepository lineaPiezaRepository;

    private final OrdenTrabajoMapper ordenMapper;
    private final LineaPiezaMapper lineaMapper;

    @Transactional
    public OrdenTrabajoResponse crear(OrdenTrabajoCreateRequest req) {
        Vehiculo v = vehiculoRepository.findById(req.vehiculoId())
                .orElseThrow(() -> new NotFoundException("Vehículo no encontrado"));

        OrdenTrabajo o = ordenMapper.toEntity(req);
        o.setVehiculo(v);

        // normalizar valores por defecto
        if (o.getEstado() == null) o.setEstado(EstadoOrden.PENDIENTE);
        if (o.getFechaEntrada() == null) o.setFechaEntrada(LocalDateTime.now());

        return ordenMapper.toResponse(ordenRepository.save(o));
    }

    @Transactional(readOnly = true)
    public OrdenTrabajoResponse obtener(Long id) {
        OrdenTrabajo o = ordenRepository.findWithLineasById(id)
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        return ordenMapper.toResponse(o);
    }

    @Transactional(readOnly = true)
    public List<OrdenTrabajoResponse> listarPorVehiculo(Long vehiculoId) {
        return ordenMapper.toResponseList(ordenRepository.findByVehiculo_Id(vehiculoId));
    }

    @Transactional
    public OrdenTrabajoResponse cambiarEstado(Long id, EstadoOrden nuevoEstado) {
        OrdenTrabajo o = ordenRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));

        // Reglas simples de transición (ejemplo)
        if (o.getEstado() == EstadoOrden.FINALIZADO) {
            throw new BadRequestException("La orden ya está finalizada");
        }
        o.setEstado(nuevoEstado);
        if (nuevoEstado == EstadoOrden.FINALIZADO && o.getFechaCierre() == null) {
            o.setFechaCierre(LocalDateTime.now());
            if (o.getCosteReal() == null) o.setCosteReal(BigDecimal.ZERO);
        }
        return ordenMapper.toResponse(ordenRepository.save(o));
    }

    @Transactional
    public LineaPiezaResponse agregarLinea(LineaPiezaCreateRequest req) {
        OrdenTrabajo o = ordenRepository.findById(req.ordenId())
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        Pieza p = piezaRepository.findById(req.piezaId())
                .orElseThrow(() -> new NotFoundException("Pieza no encontrada"));

        // Validar stock
        if (p.getStock() < req.cantidad()) {
            throw new BadRequestException("Stock insuficiente de la pieza");
        }

        // Descontar stock y fijar precio unitario histórico
        p.setStock(p.getStock() - req.cantidad());
        piezaRepository.save(p);

        LineaPieza linea = lineaMapper.toEntity(req);
        linea.setOrden(o);
        linea.setPieza(p);
        linea = lineaPiezaRepository.save(linea);

        // Añadir a la orden en memoria (para mantener consistencia del lado entidad)
        o.getLineas().add(linea);
        ordenRepository.save(o);

        return lineaMapper.toResponse(linea);
    }

    @Transactional
    public OrdenTrabajoResponse fijarCosteReal(Long id, BigDecimal costeReal) {
        if (costeReal == null || costeReal.compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("Coste real inválido");
        }
        OrdenTrabajo o = ordenRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        o.setCosteReal(costeReal);
        return ordenMapper.toResponse(ordenRepository.save(o));
    }

    @Transactional
    public void eliminar(Long id) {
        OrdenTrabajo o = ordenRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        // Reglas: permitir eliminar si no está FINALIZADO (ejemplo)
        if (o.getEstado() == EstadoOrden.FINALIZADO) {
            throw new BadRequestException("No se puede eliminar una orden finalizada");
        }
        ordenRepository.delete(o);
    }
}
