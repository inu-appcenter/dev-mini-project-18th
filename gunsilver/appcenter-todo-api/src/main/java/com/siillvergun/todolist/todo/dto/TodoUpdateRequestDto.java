package com.siillvergun.todolist.todo.dto;

import com.siillvergun.todolist.todo.entity.Category;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoUpdateRequestDto {
    @NotBlank(message = "내용은 필수 입니다")
    private String content;
    @NotNull
    @FutureOrPresent(message = "마감일은 과거이면 안됍니다.")
    private LocalDate dueDate;
    @NotNull(message = "정해진 카테고리만 사용할 수 있습니다.")
    private Category category;
    private boolean completed;
}
