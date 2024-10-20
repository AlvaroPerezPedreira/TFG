package com.tfg.TFG.rest.dtos.lodgeDtos;

import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.Lodge.LodgeProvider;
import com.tfg.TFG.rest.dtos.userDtos.UserConversor;

public class LodgeConversor {
    public static LodgeDto toDto(Lodge lodge) {
        LodgeDto lodgeDto = new LodgeDto();
        lodgeDto.setId(lodge.getId());
        lodgeDto.setLodge_name(lodge.getLodge_name());
        lodgeDto.setLodge_description(lodge.getLodge_description());
        lodgeDto.setLodge_address(lodge.getLodge_address());
        lodgeDto.setLodge_phone(lodge.getLodge_phone());
        lodgeDto.setCity(lodge.getCity());
        lodgeDto.setCountry(lodge.getCountry());
        lodgeDto.setAvailable_rooms(lodge.getAvailable_rooms());
        lodgeDto.setPrice_per_night(lodge.getPrice_per_night());
        lodgeDto.setCheck_in(lodge.getCheck_in());
        lodgeDto.setCheck_out(lodge.getCheck_out());
        lodgeDto.setIs_closed(lodge.getIs_closed());

        if (lodge.getLodge_provider() == LodgeProvider.DeepDive) {
            lodgeDto.setLodge_provider("DeepDive");
        } else {
            lodgeDto.setLodge_provider("Others");
        }

        lodgeDto.setUser(UserConversor.toUserDto(lodge.getUser()));
        lodgeDto.setImages(Lodge_ImageConversor.toDtoList(lodge.getImages()));
        lodgeDto.setFeatures(FeatureConversor.toDtoList(lodge.getFeatures()));

        return lodgeDto;
    }

    public static Lodge toEntity(LodgeDto lodgeDto) {
        Lodge lodge = new Lodge();
        lodge.setId(lodgeDto.getId());
        lodge.setLodge_name(lodgeDto.getLodge_name());
        lodge.setLodge_description(lodgeDto.getLodge_description());
        lodge.setLodge_address(lodgeDto.getLodge_address());
        lodge.setLodge_phone(lodgeDto.getLodge_phone());
        lodge.setCity(lodgeDto.getCity());
        lodge.setCountry(lodgeDto.getCountry());
        lodge.setAvailable_rooms(lodgeDto.getAvailable_rooms());
        lodge.setPrice_per_night(lodgeDto.getPrice_per_night());
        lodge.setCheck_in(lodgeDto.getCheck_in());
        lodge.setCheck_out(lodgeDto.getCheck_out());
        lodge.setIs_closed(lodgeDto.getIs_closed());

        if (lodgeDto.getLodge_provider().equals("DeepDive")) {
            lodge.setLodge_provider(LodgeProvider.DeepDive);
        } else {
            lodge.setLodge_provider(LodgeProvider.Others);
        }

        lodge.setUser(UserConversor.toUser(lodgeDto.getUser()));
        lodge.setImages(Lodge_ImageConversor.toEntityList(lodgeDto.getImages()));
        lodge.setFeatures(FeatureConversor.toEntityList(lodgeDto.getFeatures()));

        return lodge;
    }
}
