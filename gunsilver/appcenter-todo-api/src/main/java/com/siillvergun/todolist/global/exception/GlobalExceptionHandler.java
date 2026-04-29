package com.siillvergun.todolist.global.exception;

import com.siillvergun.todolist.global.exception.dto.ErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.List;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // 일반 비즈니스 예외
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseDto> handleCustomError(CustomException e) {
        return ErrorResponseDto.toErrorResponseDto(e.getErrorCode());
    }

    // DTO 검증 예외
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleDtoValidError(MethodArgumentNotValidException e) {
        ErrorCode errorCode = ErrorCode.INVALID_INPUT_VALUE;
        List<String> errors = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        return ErrorResponseDto.toErrorResponseDto(errorCode, "요청한 값이 올바르지 않습니다.", errors);
    }

    // 요청 본문 JSON 형식, enum 값, 날짜 형식 등이 올바르지 않을 때
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDto> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return ErrorResponseDto.toErrorResponseDto(ErrorCode.INVALID_INPUT_VALUE);
    }

    // @RequestParam, @PathVariable 타입 변환 실패
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponseDto> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        return ErrorResponseDto.toErrorResponseDto(ErrorCode.INVALID_INPUT_VALUE);
    }

    // MISSING_PART (@RequestParam이나 @RequestPart가 누락되었을 때)
    @ExceptionHandler({MissingServletRequestParameterException.class, MissingServletRequestPartException.class})
    public ResponseEntity<ErrorResponseDto> handleMissingPartException(Exception e) {
        return ErrorResponseDto.toErrorResponseDto(ErrorCode.MISSING_PART);
    }

    // 4. NO_HANDLER_FOUND (존재하지 않는 URL로 요청이 왔을 때 - 404)
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleNoHandlerFoundException(NoHandlerFoundException e) {
        return ErrorResponseDto.toErrorResponseDto(ErrorCode.NO_HANDLER_FOUND);
    }

    // 5. METHOD_NOT_ALLOWED (지원하지 않는 HTTP 메서드로 요청 시, 예: GET인데 POST로 보냄)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponseDto> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return ErrorResponseDto.toErrorResponseDto(ErrorCode.METHOD_NOT_ALLOWED);
    }

    // 6. ACCESS_DENIED (Spring Security 권한 부족 시 - 403)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDto> handleAccessDeniedException(AccessDeniedException e) {
        return ErrorResponseDto.toErrorResponseDto(ErrorCode.ACCESS_DENIED);
    }

    // 7. INTERNAL_SERVER_ERROR (최후의 보루: 위에서 못 잡은 모든 에러)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleAllException(Exception e) {
        log.error("internal_server_error", e);

        return ErrorResponseDto.toErrorResponseDto(ErrorCode.INTERNAL_SERVER_ERROR);
    }
}
