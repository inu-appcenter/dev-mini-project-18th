package com.siillvergun.todolist.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    TODO_NOT_FOUND("1000", "Todo를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    INVALID_INPUT_VALUE("1001", "입력값이 올바르지 않습니다.", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;

}
