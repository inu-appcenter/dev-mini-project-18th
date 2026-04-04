package com.siillvergun.todolist.global.error;

import com.siillvergun.todolist.global.error.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomError.class)
    public ResponseEntity<ErrorResponseDto> handleCustomError(CustomError e) {
        ErrorCode errorCode = e.getErrorCode();
        // 에러를 Dto에 담는다
        ErrorResponseDto response = ErrorResponseDto.of(e.getErrorCode());
        // Http 상태 코드를 JSON 데이터의 응답으로 보냄
        return ResponseEntity.status(errorCode.getHttpStatus()).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleDtoValidError(MethodArgumentNotValidException e) {
        // 1. DTO에서 설정한 에러 메시지 꺼내기 (예: "특수문자를 포함하여 8자 이상 입력하시오")
        String errorMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        // 3. 에러를 Dto에 담기 (새로 만든 of 메서드 사용)
        ErrorResponseDto response = ErrorResponseDto.of(ErrorCode.TODO_NOT_FOUND, errorMessage);
        // 4. Http 상태 코드를 JSON 데이터의 응답으로 보냄 (400 Bad Request)
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
