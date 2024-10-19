package com.tfg.TFG.rest.dtos.lodgeDtos;

public class FeatureDto {
    private Long id;
    private String feature_name;

    public FeatureDto() {
    }

    public FeatureDto(String feature_name) {
        this.feature_name = feature_name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeature_name() {
        return feature_name;
    }

    public void setFeature_name(String feature_name) {
        this.feature_name = feature_name;
    }
}
