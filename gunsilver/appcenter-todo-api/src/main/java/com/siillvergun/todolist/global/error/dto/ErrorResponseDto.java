package com.siillvergun.todolist.global.error.dto;

import com.siillvergun.todolist.global.error.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponseDto {
    private String errorCode;
    private List<String> messages;

    /// 그냥 에러 코드에 있는 메시지를 받음(에러코드에 있는 기본적인 메시지)
    public static ErrorResponseDto of(ErrorCode errorCode) {
        return ErrorResponseDto.builder()
                .errorCode(errorCode.getCode())
                .messages(List.of(errorCode.getMessage()))
                .build();
    }

    /// DTO 검증 어노테이션의 메시지도 받을 수 있는 팩토리 메서드(DTO에 있는 구체적인 메시지)
    public static ErrorResponseDto of(ErrorCode errorCode, List<String> customMessages) {
        return ErrorResponseDto.builder()
                .errorCode(errorCode.getCode())
                .messages(customMessages) // DTO에서 넘어온 상세 메시지를 덮어씌움
                .build();
    }
}
