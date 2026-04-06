package com.siillvergun.todolist.global.exception;

import com.siillvergun.todolist.global.exception.dto.ErrorResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 커스텀 에러에서 나오는 에러 처리(서비스)
    @ExceptionHandler(CustomError.class)
    public ResponseEntity<ErrorResponseDto> handleCustomError(CustomError e) {
        // 발생한 에러를 가져와 errorCode에 넣고
        ErrorCode errorCode = e.getErrorCode();
        // Dto로 변환해 담는다
        ErrorResponseDto response = ErrorResponseDto.of(e.getErrorCode());
        // 에러 객체에서 정의해둔 Http 상태 코드를 JSON 데이터의 응답으로 보냄
        return ResponseEntity.status(errorCode.getHttpStatus()).body(response);
    }

    // DTO검증 실패 에러 처리(DTO)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleDtoValidError(MethodArgumentNotValidException e) {
        // getBindingResult()로 검증 결과 객체를 가져옴. 어떤 필드에서 어떤 에러가 났는지 전부 담겨있음
        // getAllErrors()로 발생한 모든 에러를 리스트로 가져옴
        // stream()을 통해 리스트 형태로 가져온 에러를 스트림으로 변환해서 하나씩 처리할 수 있게 함
        // map()으로 각 에러 객체에서 어노테이션에서 정의한 메시지만 꺼냄
        // toList()로 스트림을 다시 리스트로 변환
        List<String> errorMessages = e.getBindingResult().getAllErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();

        // map을 통해 가져온 에러 메시지들을 응답 Dto에 넘겨줌.
        ErrorResponseDto response = ErrorResponseDto.of(ErrorCode.INVALID_INPUT_VALUE, errorMessages);
        // Http 상태 코드를 JSON 데이터의 응답으로 보냄 (400 Bad Request)
        return ResponseEntity.status(ErrorCode.INVALID_INPUT_VALUE.getHttpStatus()).body(response);
    }
}
