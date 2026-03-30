package com.siillvergun.todolist.todo.dto;

import com.siillvergun.todolist.todo.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TodoRequestDto {
    private String content;
    private LocalDate dueDate;
    private String category;
    private Boolean completed;

    public Todo toEntity() {
        return Todo.builder()
                .content(this.content)
                .dueDate(this.dueDate)
                .category(this.category)
                .completed(false)
                .build();
    }
}
