package com.siillvergun.todolist.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. REST API 필수: CSRF 비활성화 (POST, PUT, DELETE 요청 허용을 위해)
                .csrf(csrf -> csrf.disable())
                // 2. 프론트엔드 연동 필수: CORS 설정 적용
                .cors(Customizer.withDefaults())
                // 3. 인증 제외: 모든 요청을 조건 없이 허용 (특정 URL 나열 불필요)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                // 4. H2 콘솔 사용을 위한 필수 설정 (iframe 렌더링 허용)
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))

                // 5. 불필요한 기본 UI 및 인증창 비활성화
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
