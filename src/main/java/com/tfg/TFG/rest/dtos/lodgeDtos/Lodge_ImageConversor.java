package com.tfg.TFG.rest.dtos.lodgeDtos;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.Lodge_Image;
import com.tfg.TFG.model.entities.LodgeDao;

public class Lodge_ImageConversor {

    @Autowired
    private static LodgeDao lodgeDao;

    public static Lodge_ImageDto toDto(Lodge_Image lodge_image) {
        Lodge_ImageDto lodge_imageDto = new Lodge_ImageDto();
        lodge_imageDto.setId(lodge_image.getId());
        lodge_imageDto.setImage_url(lodge_image.getImage_url());
        lodge_imageDto.setLodgeId(lodge_image.getLodge().getId());

        return lodge_imageDto;
    }

    // List conversor
    public static List<Lodge_ImageDto> toDtoList(List<Lodge_Image> lodge_images) {
        return lodge_images.stream().map(Lodge_ImageConversor::toDto).collect(Collectors.toList());
    }

    public static Lodge_Image toEntity(Lodge_ImageDto lodge_imageDto) {
        Lodge_Image lodge_image = new Lodge_Image();
        lodge_image.setId(lodge_imageDto.getId());
        lodge_image.setImage_url(lodge_imageDto.getImage_url());
        Optional<Lodge> lodge = lodgeDao.findById(lodge_imageDto.getLodgeId());
        lodge_image.setLodge(lodge.get());

        return lodge_image;
    }

    // List conversor
    public static List<Lodge_Image> toEntityList(List<Lodge_ImageDto> lodge_imageDtos) {
        return lodge_imageDtos.stream().map(Lodge_ImageConversor::toEntity).collect(Collectors.toList());
    }
}
