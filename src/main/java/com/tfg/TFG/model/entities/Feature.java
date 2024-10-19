package com.tfg.TFG.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Feature")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String feature_name;

    // Constructores
    public Feature() {
    }

    public Feature(String feature_name) {
        this.feature_name = feature_name;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Name
    public String getFeature_name() {
        return feature_name;
    }

    public void setFeature_name(String feature_name) {
        this.feature_name = feature_name;
    }
}
