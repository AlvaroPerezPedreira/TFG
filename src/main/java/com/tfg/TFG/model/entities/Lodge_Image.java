package com.tfg.TFG.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Lodge_Image")
public class Lodge_Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String image_url;

    @ManyToOne
    @JoinColumn(name = "lodge_id", nullable = false)
    private Lodge lodge;

    // Constructores
    public Lodge_Image() {
    }

    public Lodge_Image(String image_url, Lodge lodge) {
        this.image_url = image_url;
        this.lodge = lodge;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Url
    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    // Lodge
    public Lodge getLodge() {
        return lodge;
    }

    public void setLodge(Lodge lodge) {
        this.lodge = lodge;
    }
}
