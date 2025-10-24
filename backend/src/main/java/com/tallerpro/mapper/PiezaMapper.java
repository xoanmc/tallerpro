package com.tallerpro.mapper;

import com.tallerpro.api.dto.pieza.PiezaCreateRequest;
import com.tallerpro.api.dto.pieza.PiezaResponse;
import com.tallerpro.domain.Pieza;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PiezaMapper {

    Pieza toEntity(PiezaCreateRequest request);

    PiezaResponse toResponse(Pieza entity);

    List<PiezaResponse> toResponseList(List<Pieza> entities);
}
