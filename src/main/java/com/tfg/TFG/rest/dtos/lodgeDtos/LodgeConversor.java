package com.tfg.TFG.rest.dtos.lodgeDtos;

import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.Lodge.HotelProvider;
import com.tfg.TFG.rest.dtos.userDtos.UserConversor;

public class LodgeConversor {
    public static LodgeDto toDto(Lodge lodge) {
        LodgeDto lodgeDto = new LodgeDto();
        lodgeDto.setId(lodge.getId());
        lodgeDto.setHotel_name(lodge.getHotel_name());
        lodgeDto.setHotel_description(lodge.getHotel_description());
        lodgeDto.setHotel_address(lodge.getHotel_address());
        lodgeDto.setHotel_phone(lodge.getHotel_phone());
        lodgeDto.setCity(lodge.getCity());
        lodgeDto.setCountry(lodge.getCountry());
        lodgeDto.setAvailable_rooms(lodge.getAvailable_rooms());
        lodgeDto.setPrice_per_night(lodge.getPrice_per_night());
        lodgeDto.setCheck_in(lodge.getCheck_in());
        lodgeDto.setCheck_out(lodge.getCheck_out());
        lodgeDto.setIs_closed(lodge.getIs_closed());

        if (lodge.getHotel_provider() == HotelProvider.DeepDive) {
            lodgeDto.setHotel_provider("DeepDive");
        } else {
            lodgeDto.setHotel_provider("Others");
        }

        lodgeDto.setUser(UserConversor.toUserDto(lodge.getUser()));
        lodgeDto.setImages(Lodge_ImageConversor.toDtoList(lodge.getImages()));
        lodgeDto.setFeatures(FeatureConversor.toDtoList(lodge.getFeatures()));

        return lodgeDto;
    }

    public static Lodge toEntity(LodgeDto lodgeDto) {
        Lodge lodge = new Lodge();
        lodge.setId(lodgeDto.getId());
        lodge.setHotel_name(lodgeDto.getHotel_name());
        lodge.setHotel_description(lodgeDto.getHotel_description());
        lodge.setHotel_address(lodgeDto.getHotel_address());
        lodge.setHotel_phone(lodgeDto.getHotel_phone());
        lodge.setCity(lodgeDto.getCity());
        lodge.setCountry(lodgeDto.getCountry());
        lodge.setAvailable_rooms(lodgeDto.getAvailable_rooms());
        lodge.setPrice_per_night(lodgeDto.getPrice_per_night());
        lodge.setCheck_in(lodgeDto.getCheck_in());
        lodge.setCheck_out(lodgeDto.getCheck_out());
        lodge.setIs_closed(lodgeDto.getIs_closed());

        if (lodgeDto.getHotel_provider().equals("DeepDive")) {
            lodge.setHotel_provider(HotelProvider.DeepDive);
        } else {
            lodge.setHotel_provider(HotelProvider.Others);
        }

        lodge.setUser(UserConversor.toUser(lodgeDto.getUser()));
        lodge.setImages(Lodge_ImageConversor.toEntityList(lodgeDto.getImages()));
        lodge.setFeatures(FeatureConversor.toEntityList(lodgeDto.getFeatures()));

        return lodge;
    }
}
