package com.siillvergun.todolist.global.exception.dto;

import com.siillvergun.todolist.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponseDto {
    private Integer code;
    private String name;
    private String message;
    private List<String> errors;

    public static ErrorResponseDto of(ErrorCode errorCode) {
        return ErrorResponseDto.builder()
                .code(errorCode.getCode())
                .name(errorCode.name())
                .message(errorCode.getMessage())
                .errors(null)
                .build();
    }

    // 기본 메시지를 그대로 쓸 수도 있고, dto검증 메시지를 덮어쓸 수도 있음
    public static ErrorResponseDto of(ErrorCode errorCode, String message,
                                      List<String> errors) {
        return ErrorResponseDto.builder()
                .code(errorCode.getCode())
                .name(errorCode.name())
                .message(message)
                .errors(errors)
                .build();
    }
}
