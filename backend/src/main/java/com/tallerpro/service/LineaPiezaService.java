package com.tallerpro.service;

import com.tallerpro.api.dto.orden.LineaPiezaCreateRequest;
import com.tallerpro.api.dto.orden.LineaPiezaResponse;
import com.tallerpro.domain.LineaPieza;
import com.tallerpro.domain.OrdenTrabajo;
import com.tallerpro.domain.Pieza;
import com.tallerpro.mapper.LineaPiezaMapper;
import com.tallerpro.repository.LineaPiezaRepository;
import com.tallerpro.repository.OrdenTrabajoRepository;
import com.tallerpro.repository.PiezaRepository;
import com.tallerpro.service.exception.BadRequestException;
import com.tallerpro.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LineaPiezaService {

    private final LineaPiezaRepository lineaPiezaRepository;
    private final OrdenTrabajoRepository ordenRepository;
    private final PiezaRepository piezaRepository;
    private final LineaPiezaMapper mapper;

    @Transactional
    public LineaPiezaResponse crear(LineaPiezaCreateRequest req) {
        OrdenTrabajo orden = ordenRepository.findById(req.ordenId())
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        Pieza pieza = piezaRepository.findById(req.piezaId())
                .orElseThrow(() -> new NotFoundException("Pieza no encontrada"));

        if (pieza.getStock() < req.cantidad()) {
            throw new BadRequestException("Stock insuficiente de la pieza");
        }

        // Descontar stock
        pieza.setStock(pieza.getStock() - req.cantidad());
        piezaRepository.save(pieza);

        LineaPieza linea = mapper.toEntity(req);
        linea.setOrden(orden);
        linea.setPieza(pieza);

        linea = lineaPiezaRepository.save(linea);
        return mapper.toResponse(linea);
    }

    @Transactional(readOnly = true)
    public LineaPiezaResponse obtener(Long id) {
        LineaPieza l = lineaPiezaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Línea no encontrada"));
        return mapper.toResponse(l);
    }

    @Transactional(readOnly = true)
    public List<LineaPiezaResponse> listarPorOrden(Long ordenId) {
        OrdenTrabajo o = ordenRepository.findById(ordenId)
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        return mapper.toResponseList(o.getLineas());
    }

    @Transactional
    public void eliminar(Long id) {
        LineaPieza l = lineaPiezaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Línea no encontrada"));
        // opcional: reponer stock al eliminar la línea
        Pieza p = l.getPieza();
        p.setStock(p.getStock() + l.getCantidad());
        piezaRepository.save(p);

        lineaPiezaRepository.delete(l);
    }
}
