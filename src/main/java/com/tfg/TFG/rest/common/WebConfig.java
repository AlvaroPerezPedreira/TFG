package com.tfg.TFG.rest.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @SuppressWarnings("null")
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configuración para servir imágenes desde una carpeta local
        registry.addResourceHandler("/images/**")
                .addResourceLocations("/images/");
    }
}
