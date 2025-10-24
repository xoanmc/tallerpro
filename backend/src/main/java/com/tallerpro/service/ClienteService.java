package com.tallerpro.service;

import com.tallerpro.api.dto.cliente.ClienteCreateRequest;
import com.tallerpro.api.dto.cliente.ClienteResponse;
import com.tallerpro.domain.Cliente;
import com.tallerpro.mapper.ClienteMapper;
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
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final VehiculoRepository vehiculoRepository;
    private final ClienteMapper clienteMapper;

    @Transactional
    public ClienteResponse crear(ClienteCreateRequest request) {
        if (clienteRepository.existsByEmailIgnoreCase(request.email())) {
            throw new BadRequestException("Ya existe un cliente con ese email");
        }
        Cliente entity = clienteMapper.toEntity(request);
        return clienteMapper.toResponse(clienteRepository.save(entity));
    }

    @Transactional(readOnly = true)
    public ClienteResponse obtener(Long id) {
        Cliente c = clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente no encontrado"));
        return clienteMapper.toResponse(c);
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listar() {
        return clienteMapper.toResponseList(clienteRepository.findAll());
    }

    @Transactional
    public ClienteResponse actualizar(Long id, ClienteCreateRequest request) {
        Cliente c = clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente no encontrado"));

        // si cambia el email, validar unicidad
        if (!c.getEmail().equalsIgnoreCase(request.email()) &&
                clienteRepository.existsByEmailIgnoreCase(request.email())) {
            throw new BadRequestException("Email ya registrado por otro cliente");
        }

        c.setNombre(request.nombre());
        c.setTelefono(request.telefono());
        c.setEmail(request.email());

        return clienteMapper.toResponse(clienteRepository.save(c));
    }

    @Transactional
    public void eliminar(Long id) {
        Cliente c = clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente no encontrado"));
        if (!vehiculoRepository.findByCliente_Id(id).isEmpty()) {
            throw new BadRequestException("No se puede eliminar: el cliente tiene vehículos asociados");
        }
        clienteRepository.delete(c);
    }
}
