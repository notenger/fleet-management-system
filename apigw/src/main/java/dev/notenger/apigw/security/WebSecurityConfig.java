package dev.notenger.apigw.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

@Configuration
@EnableWebFluxSecurity
public class WebSecurityConfig {

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity httpSecurity) {
		httpSecurity
				.csrf().disable()
				.authorizeExchange()
				.pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.anyExchange().authenticated()
				.and()
				.securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
				.oauth2ResourceServer()
				.jwt();

		return httpSecurity.build();
	}
}