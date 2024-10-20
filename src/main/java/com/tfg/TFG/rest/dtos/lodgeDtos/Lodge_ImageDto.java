package com.tfg.TFG.rest.dtos.lodgeDtos;

public class Lodge_ImageDto {
    private Long id;
    private String image_url;
    private Long lodge_id;

    public Lodge_ImageDto() {
    }

    public Lodge_ImageDto(String image_url, Long lodge_id) {
        this.image_url = image_url;
        this.lodge_id = lodge_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public Long getLodgeId() {
        return lodge_id;
    }

    public void setLodgeId(Long lodge_id) {
        this.lodge_id = lodge_id;
    }
}
