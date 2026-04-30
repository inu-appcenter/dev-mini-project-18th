package com.siillvergun.todolist.todo.controller;

import com.siillvergun.todolist.global.exception.dto.ErrorResponseDto;
import com.siillvergun.todolist.todo.SortType;
import com.siillvergun.todolist.todo.dto.TodoCompletedUpdateRequestDto;
import com.siillvergun.todolist.todo.dto.TodoRequestDto;
import com.siillvergun.todolist.todo.dto.TodoResponseDto;
import com.siillvergun.todolist.todo.dto.TodoUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "Todo", description = "Todo 관련 API")
public interface TodoApiSpecification {
    @Operation(
            summary = "Todo 생성",
            description = "Todo를 생성합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Todo 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TodoResponseDto.class),
                            examples = @ExampleObject(
                                    name = "Todo 생성 성공 예시",
                                    value = """
                                            {
                                              "id": 1,
                                              "content": "운동하기",
                                              "dueDate": "2026-05-01",
                                              "category": "IMPORTANT",
                                              "completed": false,
                                              "createdAt": "2026-04-29T12:00:00",
                                              "updatedAt": "2026-04-29T12:00:00"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청(검증 실패/형식 오류)",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class),
                            examples = {
                                    @ExampleObject(
                                            name = "검증 실패 예시",
                                            value = """
                                                    {
                                                      "code": 400,
                                                      "name": "INVALID_INPUT_VALUE",
                                                      "message": "요청한 값이 올바르지 않습니다.",
                                                      "errors": [
                                                        "content: 내용은 필수 입니다"
                                                      ]
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "형식 오류 예시",
                                            value = """
                                                    {
                                                      "code": 400,
                                                      "name": "INVALID_INPUT_VALUE",
                                                      "message": "요청한 값이 올바르지 않습니다.",
                                                      "errors": null
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<TodoResponseDto> createTodo(@RequestBody @Valid TodoRequestDto todoRequestDto);

    @Operation(
            summary = "모든 Todo 조회",
            description = "모든 Todo를 조회합니다."

    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "모든 Todo 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = TodoResponseDto.class)),
                            examples = @ExampleObject(
                                    name = "전체 Todo 조회 응답 예시",
                                    value = """
                                            [
                                              {
                                                "id": 1,
                                                "content": "운동하기",
                                                "dueDate": "2026-05-01",
                                                "category": "IMPORTANT",
                                                "completed": false,
                                                "createdAt": "2026-04-29T12:00:00",
                                                "updatedAt": "2026-04-29T12:00:00"
                                              },
                                              {
                                                "id": 2,
                                                "content": "장보기",
                                                "dueDate": "2026-05-02",
                                                "category": "IMPORTANT",
                                                "completed": true,
                                                "createdAt": "2026-04-29T13:00:00",
                                                "updatedAt": "2026-04-29T13:30:00"
                                              }
                                            ]
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 파라미터.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class),
                            examples = @ExampleObject(
                                    name = "전체 Todo 조회 실패 예시",
                                    value = """
                                            {
                                              "code": 400,
                                              "name": "INVALID_INPUT_VALUE",
                                              "message": "요청한 값이 올바르지 않습니다.",
                                              "errors": null
                                            }
                                            """
                            )
                    )

            )
    })
    ResponseEntity<List<TodoResponseDto>> getOneDayTodo(@RequestParam SortType sort, @RequestParam LocalDate date);

    @Operation(
            summary = "Todo 수정",
            description = "Todo를 수정합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Todo 수정 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TodoResponseDto.class),
                            examples = @ExampleObject(
                                    name = "Todo 수정 성공 예시",
                                    value = """
                                            {
                                              "id": 1,
                                              "content": "장보기",
                                              "dueDate": "2026-05-03",
                                              "category": "IMPORTANT",
                                              "completed": false,
                                              "createdAt": "2026-04-29T12:00:00",
                                              "updatedAt": "2026-04-29T14:00:00"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청입니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class),
                            examples = @ExampleObject(
                                    name = "Todo 수정 실패 예시",
                                    value = """
                                            {
                                              "code": 400,
                                              "name": "INVALID_INPUT_VALUE",
                                              "message": "요청한 값이 올바르지 않습니다.",
                                              "errors": [
                                                "dueDate: 마감일은 과거이면 안됍니다."
                                              ]
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Todo를 찾을 수 없습니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class)
                    )
            )
    })
    ResponseEntity<TodoResponseDto> updateTodo(@PathVariable Long id, @RequestBody @Valid TodoUpdateRequestDto todoUpdateRequestDto);

    @Operation(
            summary = "Todo 완료 여부 수정",
            description = "Todo의 완료 여부를 수정합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Todo 완료 여부 수정 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TodoResponseDto.class),
                            examples = @ExampleObject(
                                    name = "Todo 완료 여부 수정 성공 예시",
                                    value = """
                                            {
                                              "id": 1,
                                              "content": "운동하기",
                                              "dueDate": "2026-05-01",
                                              "category": "IMPORTANT",
                                              "completed": true,
                                              "createdAt": "2026-04-29T12:00:00",
                                              "updatedAt": "2026-04-29T15:00:00"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Todo를 찾을 수 없습니다",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청입니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class),
                            examples = @ExampleObject(
                                    name = "입력값 오류 예시",
                                    value = """
                                            {
                                              "code": 400,
                                              "name": "INVALID_INPUT_VALUE",
                                              "message": "요청한 값이 올바르지 않습니다.",
                                              "errors": null
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<TodoResponseDto> updateCompleted(@PathVariable Long id, @RequestBody TodoCompletedUpdateRequestDto requestDto);

    @Operation(
            summary = "Todo 삭제",
            description = "Todo를 삭제합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Todo 삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Todo를 찾을 수 없습니다",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponseDto.class)
                    )
            )
    })
    ResponseEntity<Void> deleteTodo(@PathVariable Long id);
}
