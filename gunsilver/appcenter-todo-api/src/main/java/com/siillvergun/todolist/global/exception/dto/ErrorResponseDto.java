package com.siillvergun.todolist.global.exception.dto;

import com.siillvergun.todolist.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponseDto {
    private Integer code;
    private String name;
    private String message;
    private List<String> errors;

    // 1. 에러 코드만 받아서 기본 메시지로 응답을 만들 때
    public static ResponseEntity<ErrorResponseDto> toErrorResponseDto(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponseDto.builder()
                        .code(errorCode.getCode())
                        .name(errorCode.name())
                        .message(errorCode.getMessage())
                        .errors(null)
                        .build());
    }

    // 2. 검증 실패(Validation)처럼 상세 에러 목록이나 커스텀 메시지가 필요할 때
    public static ResponseEntity<ErrorResponseDto> toErrorResponseDto(ErrorCode errorCode, String message, List<String> errors) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponseDto.builder()
                        .code(errorCode.getCode())
                        .name(errorCode.name())
                        .message(message)
                        .errors(errors)
                        .build()
                );
    }
}
