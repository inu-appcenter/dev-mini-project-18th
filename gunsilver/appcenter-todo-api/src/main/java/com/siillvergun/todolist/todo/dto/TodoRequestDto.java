package com.siillvergun.todolist.todo.dto;

import com.siillvergun.todolist.todo.entity.Category;
import com.siillvergun.todolist.todo.entity.Todo;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoRequestDto {
    private String content;
    private LocalDate dueDate;
    private Category category;

    public Todo toEntity() {
        return Todo.builder()
                .content(this.content)
                .dueDate(this.dueDate)
                .category(this.category)
                .completed(false)
                .build();
    }
}
