package com.tallerpro.service;

import com.tallerpro.api.dto.pieza.PiezaCreateRequest;
import com.tallerpro.api.dto.pieza.PiezaResponse;
import com.tallerpro.domain.Pieza;
import com.tallerpro.mapper.PiezaMapper;
import com.tallerpro.repository.PiezaRepository;
import com.tallerpro.service.exception.BadRequestException;
import com.tallerpro.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PiezaService {

    private final PiezaRepository piezaRepository;
    private final PiezaMapper piezaMapper;

    @Transactional
    public PiezaResponse crear(PiezaCreateRequest req) {
        if (req.precioUnitario().compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("El precio unitario no puede ser negativo");
        }
        Pieza p = piezaMapper.toEntity(req);
        return piezaMapper.toResponse(piezaRepository.save(p));
    }

    @Transactional(readOnly = true)
    public PiezaResponse obtener(Long id) {
        Pieza p = piezaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pieza no encontrada"));
        return piezaMapper.toResponse(p);
    }

    @Transactional(readOnly = true)
    public List<PiezaResponse> listar() {
        return piezaMapper.toResponseList(piezaRepository.findAll());
    }

    @Transactional
    public PiezaResponse actualizar(Long id, PiezaCreateRequest req) {
        Pieza p = piezaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pieza no encontrada"));
        if (req.precioUnitario().compareTo(BigDecimal.ZERO) < 0) {
            throw new BadRequestException("El precio unitario no puede ser negativo");
        }
        p.setNombre(req.nombre());
        p.setProveedor(req.proveedor());
        p.setPrecioUnitario(req.precioUnitario());
        p.setStock(req.stock());
        return piezaMapper.toResponse(piezaRepository.save(p));
    }

    @Transactional
    public void eliminar(Long id) {
        Pieza p = piezaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pieza no encontrada"));
        piezaRepository.delete(p);
    }

    @Transactional
    public PiezaResponse ajustarStock(Long id, int delta) {
        Pieza p = piezaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pieza no encontrada"));
        int nuevo = p.getStock() + delta;
        if (nuevo < 0) throw new BadRequestException("Stock insuficiente");
        p.setStock(nuevo);
        return piezaMapper.toResponse(piezaRepository.save(p));
    }
}
