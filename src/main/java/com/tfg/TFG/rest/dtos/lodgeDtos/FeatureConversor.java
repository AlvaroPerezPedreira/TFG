package com.tfg.TFG.rest.dtos.lodgeDtos;

import java.util.List;
import java.util.stream.Collectors;

import com.tfg.TFG.model.entities.Feature;

public class FeatureConversor {
    public static FeatureDto toDto(Feature feature) {
        FeatureDto featureDto = new FeatureDto();
        featureDto.setId(feature.getId());
        featureDto.setFeature_nameEN(feature.getFeature_nameEN());
        featureDto.setFeature_nameES(feature.getFeature_nameES());
        featureDto.setFeature_nameFR(feature.getFeature_nameFR());
        featureDto.setCategory(feature.getCategory());

        return featureDto;
    }

    // List conversor
    public static List<FeatureDto> toDtoList(List<Feature> features) {
        return features.stream().map(FeatureConversor::toDto).collect(Collectors.toList());
    }

    public static Feature toEntity(FeatureDto featureDto) {
        Feature feature = new Feature();
        feature.setId(featureDto.getId());
        feature.setFeature_nameEN(featureDto.getFeature_nameEN());
        feature.setFeature_nameES(featureDto.getFeature_nameES());
        feature.setFeature_nameFR(featureDto.getFeature_nameFR());
        feature.setCategory(featureDto.getCategory());

        return feature;
    }

    // List conversor
    public static List<Feature> toEntityList(List<FeatureDto> featureDtos) {
        return featureDtos.stream().map(FeatureConversor::toEntity).collect(Collectors.toList());
    }
}
