package com.tallerpro.mapper;

import com.tallerpro.api.dto.cliente.ClienteCreateRequest;
import com.tallerpro.api.dto.cliente.ClienteResponse;
import com.tallerpro.domain.Cliente;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    Cliente toEntity(ClienteCreateRequest request);

    ClienteResponse toResponse(Cliente entity);

    List<ClienteResponse> toResponseList(List<Cliente> entities);
}
