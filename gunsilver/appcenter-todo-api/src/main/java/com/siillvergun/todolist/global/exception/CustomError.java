package com.siillvergun.todolist.global.exception;

import lombok.Getter;

@Getter
public class CustomError extends RuntimeException {
    private final ErrorCode errorCode;

    public CustomError(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
