package com.siillvergun.todolist.todo.controller;

import com.siillvergun.todolist.todo.SortType;
import com.siillvergun.todolist.todo.dto.TodoCompletedUpdateRequestDto;
import com.siillvergun.todolist.todo.dto.TodoRequestDto;
import com.siillvergun.todolist.todo.dto.TodoResponseDto;
import com.siillvergun.todolist.todo.dto.TodoUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
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
                            schema = @Schema(implementation = TodoResponseDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Todo 생성 실패"
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
                            array = @ArraySchema(schema = @Schema(implementation = TodoResponseDto.class))
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "모든 Todo 조회 실패"
            )
    })
    ResponseEntity<List<TodoResponseDto>> getAllTodo(@RequestParam SortType sort, @RequestParam LocalDate date);

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
                            schema = @Schema(implementation = TodoResponseDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Todo 수정 실패"
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
                            schema = @Schema(implementation = TodoResponseDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Todo 완료 여부 수정 실패"
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
                    description = "Todo 삭제 실패"
            )
    })
    ResponseEntity<Void> deleteTodo(@PathVariable Long id);
}
