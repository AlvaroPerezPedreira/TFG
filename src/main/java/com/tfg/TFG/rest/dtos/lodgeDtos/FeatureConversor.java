package com.tfg.TFG.rest.dtos.lodgeDtos;

import java.util.List;
import java.util.stream.Collectors;

import com.tfg.TFG.model.entities.Feature;

public class FeatureConversor {
    public static FeatureDto toDto(Feature feature) {
        FeatureDto featureDto = new FeatureDto();
        featureDto.setId(feature.getId());
        featureDto.setFeature_name(feature.getFeature_name());

        return featureDto;
    }

    // List conversor
    public static List<FeatureDto> toDtoList(List<Feature> features) {
        return features.stream().map(FeatureConversor::toDto).collect(Collectors.toList());
    }

    public static Feature toEntity(FeatureDto featureDto) {
        Feature feature = new Feature();
        feature.setId(featureDto.getId());
        feature.setFeature_name(featureDto.getFeature_name());

        return feature;
    }

    // List conversor
    public static List<Feature> toEntityList(List<FeatureDto> featureDtos) {
        return featureDtos.stream().map(FeatureConversor::toEntity).collect(Collectors.toList());
    }
}
