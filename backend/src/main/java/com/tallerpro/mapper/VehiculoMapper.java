package com.tallerpro.mapper;

import com.tallerpro.api.dto.vehiculo.VehiculoCreateRequest;
import com.tallerpro.api.dto.vehiculo.VehiculoResponse;
import com.tallerpro.domain.Cliente;
import com.tallerpro.domain.Vehiculo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VehiculoMapper {

    @Mapping(target = "cliente", source = "clienteId")
    Vehiculo toEntity(VehiculoCreateRequest request);

    @Mapping(target = "clienteId", source = "cliente.id")
    VehiculoResponse toResponse(Vehiculo entity);

    List<VehiculoResponse> toResponseList(List<Vehiculo> entities);

    // Helper para mapear Long -> Cliente (referencia por id)
    default Cliente fromId(Long id) {
        if (id == null) return null;
        Cliente c = new Cliente();
        c.setId(id);
        return c;
    }
}
