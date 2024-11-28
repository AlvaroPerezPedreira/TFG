package com.tfg.TFG.rest.common;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * The Class SecurityConfig.
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	/**
	 * The jwt filter.
	 */
	@Autowired
	private JwtFilter jwtFilter;

	/**
	 * Security filter chain.
	 *
	 * @param http the http
	 * @return the security filter chain
	 * @throws Exception the exception
	 */
	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// @formatter:off
		 http.cors(cors -> cors.disable()).csrf(csrf -> csrf.disable())
				 .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				 .authorizeHttpRequests(authorize -> authorize
				 		 .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
  					     .requestMatchers(antMatcher(HttpMethod.OPTIONS, "/**")).permitAll()
						 .requestMatchers(antMatcher("/*")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/users/signUp")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/users/login")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.PUT, "/users/updateUser")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/users/loginFromServiceToken")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/users/changePassword")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.GET, "/users/{email}")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.PUT, "/users/*")).hasAnyRole("USER", "ADMIN")
						 .requestMatchers(antMatcher(HttpMethod.PUT, "/lodges/*")).hasAnyRole("USER", "ADMIN")
						 .requestMatchers(antMatcher(HttpMethod.GET, "/lodges/by-place")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.GET, "/lodges/{email}")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/lodges/createPost")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.GET, "/lodges/getFeatures")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/lodges/createLodge")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/lodges/openLodge/{email}")).permitAll()
						 .requestMatchers(antMatcher(HttpMethod.POST, "/lodges/closeLodge/{email}")).permitAll()

						 .requestMatchers(antMatcher(HttpMethod.POST, "/images/uploadImage")).permitAll()
						 .requestMatchers(antMatcher("/images/**")).permitAll()  // Permitir acceso a las imágenes
						 .anyRequest().permitAll()
				 )
				 .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		 // @formatter:on
		http.headers((headers) -> headers.frameOptions((frameOptions) -> frameOptions.sameOrigin()));
		return http.build();
	}

	/**
	 * Authentication manager.
	 *
	 * @param authenticationConfiguration the authentication configuration
	 * @return the authentication manager
	 * @throws Exception the exception
	 */
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	/**
	 * Cors configuration source.
	 *
	 * @return the cors configuration source
	 */

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		config.addAllowedOrigin("http://localhost:3000/*");
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);

		return source;
	}

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		// Permitir todas las solicitudes de origen desde http://localhost:3000
		config.addAllowedOrigin("http://localhost:3000");
		config.addAllowedOrigin("http://localhost:3000/*");
		config.addAllowedOrigin("http://*");

		config.addAllowedOrigin("https://localhost:3000");
		config.addAllowedOrigin("https://localhost:3000/*");
		config.addAllowedOrigin("https://*");

		// Permitir todas las cabeceras
		config.addAllowedHeader("*");

		// Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
		config.addAllowedMethod("*");

		// Permitir las credenciales
		config.setAllowCredentials(true);

		// Registrar la configuración para todas las rutas
		source.registerCorsConfiguration("/**", config);

		// Retornar un filtro CORS
		return new CorsFilter(source);
	}

}