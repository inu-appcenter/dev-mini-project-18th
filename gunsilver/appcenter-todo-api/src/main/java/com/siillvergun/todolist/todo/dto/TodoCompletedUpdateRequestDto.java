package com.siillvergun.todolist.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "할 일 완료 여부 요청")
public class TodoCompletedUpdateRequestDto {
    @Schema(description = "완료 여부", example = "true")
    private boolean completed;
}
