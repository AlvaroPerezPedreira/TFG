package com.tfg.TFG.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Feature")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String feature_nameEN;

    @Column(nullable = false)
    private String feature_nameES;

    @Column(nullable = false)
    private String feature_nameFR;

    @Column(nullable = false)
    private String category;

    // Constructores
    public Feature() {
    }

    public Feature(String feature_nameEN, String feature_nameES, String feature_nameFR, String category) {
        this.feature_nameEN = feature_nameEN;
        this.feature_nameES = feature_nameES;
        this.feature_nameFR = feature_nameFR;
        this.category = category;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Name
    public String getFeature_nameEN() {
        return feature_nameEN;
    }

    public void setFeature_nameEN(String feature_nameEN) {
        this.feature_nameEN = feature_nameEN;
    }

    public String getFeature_nameES() {
        return feature_nameES;
    }

    public void setFeature_nameES(String feature_nameES) {
        this.feature_nameES = feature_nameES;
    }

    public String getFeature_nameFR() {
        return feature_nameFR;
    }

    public void setFeature_nameFR(String feature_nameFR) {
        this.feature_nameFR = feature_nameFR;
    }

    // Category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
