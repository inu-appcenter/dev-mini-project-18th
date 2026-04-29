package com.siillvergun.todolist.todo.dto;

import com.siillvergun.todolist.todo.entity.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Schema(description = "할 일 수정 요청")
public class TodoUpdateRequestDto {

    @Schema(description = "내용", example = "운동하기")
    @NotBlank(message = "내용은 필수 입니다")
    private String content;

    @Schema(description = "마감일", example = "2026-05-01")
    @NotNull
    @FutureOrPresent(message = "마감일은 과거이면 안됍니다.")
    private LocalDate dueDate;

    @Schema(description = "카테고리", example = "IMPORTANT")
    @NotNull(message = "정해진 카테고리만 사용할 수 있습니다.")
    private Category category;
}
