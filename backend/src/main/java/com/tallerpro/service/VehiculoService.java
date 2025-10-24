package com.tallerpro.service;

import com.tallerpro.api.dto.vehiculo.VehiculoCreateRequest;
import com.tallerpro.api.dto.vehiculo.VehiculoResponse;
import com.tallerpro.domain.Cliente;
import com.tallerpro.domain.Vehiculo;
import com.tallerpro.mapper.VehiculoMapper;
import com.tallerpro.repository.ClienteRepository;
import com.tallerpro.repository.VehiculoRepository;
import com.tallerpro.service.exception.BadRequestException;
import com.tallerpro.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehiculoService {

    private final VehiculoRepository vehiculoRepository;
    private final ClienteRepository clienteRepository;
    private final VehiculoMapper vehiculoMapper;

    @Transactional
    public VehiculoResponse crear(VehiculoCreateRequest request) {
        if (vehiculoRepository.existsByMatriculaIgnoreCase(request.matricula())) {
            throw new BadRequestException("Matrícula ya registrada");
        }
        Cliente cliente = clienteRepository.findById(request.clienteId())
                .orElseThrow(() -> new NotFoundException("Cliente no encontrado"));

        Vehiculo v = vehiculoMapper.toEntity(request);
        v.setCliente(cliente);

        return vehiculoMapper.toResponse(vehiculoRepository.save(v));
    }

    @Transactional(readOnly = true)
    public VehiculoResponse obtener(Long id) {
        Vehiculo v = vehiculoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vehículo no encontrado"));
        return vehiculoMapper.toResponse(v);
    }

    @Transactional(readOnly = true)
    public List<VehiculoResponse> listarPorCliente(Long clienteId) {
        return vehiculoMapper.toResponseList(vehiculoRepository.findByCliente_Id(clienteId));
    }

    @Transactional
    public VehiculoResponse actualizar(Long id, VehiculoCreateRequest request) {
        Vehiculo v = vehiculoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vehículo no encontrado"));

        // Si se cambia la matrícula, validar
        if (!v.getMatricula().equalsIgnoreCase(request.matricula()) &&
                vehiculoRepository.existsByMatriculaIgnoreCase(request.matricula())) {
            throw new BadRequestException("Matrícula ya registrada");
        }

        if (!v.getCliente().getId().equals(request.clienteId())) {
            Cliente nuevoCliente = clienteRepository.findById(request.clienteId())
                    .orElseThrow(() -> new NotFoundException("Cliente no encontrado"));
            v.setCliente(nuevoCliente);
        }

        v.setMatricula(request.matricula());
        v.setMarca(request.marca());
        v.setModelo(request.modelo());
        v.setAnio(request.anio());

        return vehiculoMapper.toResponse(vehiculoRepository.save(v));
    }

    @Transactional
    public void eliminar(Long id) {
        Vehiculo v = vehiculoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vehículo no encontrado"));
        // Regla simple: permitir eliminar si no hay órdenes (o si luego quieres, validar)
        if (!v.getOrdenes().isEmpty()) {
            throw new BadRequestException("No se puede eliminar: el vehículo tiene órdenes asociadas");
        }
        vehiculoRepository.delete(v);
    }
}
