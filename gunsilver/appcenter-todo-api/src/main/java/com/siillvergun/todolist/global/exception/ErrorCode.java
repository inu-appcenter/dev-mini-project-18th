package com.siillvergun.todolist.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Todo
    TODO_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "Todo를 찾을 수 없습니다."),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, 400, "입력값이 올바르지 않습니다.");

    private final HttpStatus httpStatus;
    private final Integer code;
    private final String message;
}
