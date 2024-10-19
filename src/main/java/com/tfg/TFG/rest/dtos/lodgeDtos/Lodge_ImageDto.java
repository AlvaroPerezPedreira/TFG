package com.tfg.TFG.rest.dtos.lodgeDtos;

public class Lodge_ImageDto {
    private Long id;
    private String image_url;
    private LodgeDto lodge;

    public Lodge_ImageDto() {
    }

    public Lodge_ImageDto(String image_url, LodgeDto lodge) {
        this.image_url = image_url;
        this.lodge = lodge;
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

    public LodgeDto getLodge() {
        return lodge;
    }

    public void setLodge(LodgeDto lodge) {
        this.lodge = lodge;
    }
}
