package com.siillvergun.todolist.todo.dto;

import com.siillvergun.todolist.todo.entity.Category;
import com.siillvergun.todolist.todo.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TodoResponseDto {
    private Long id;
    private String content;
    private LocalDate dueDate;
    private Category category;
    private boolean completed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TodoResponseDto from(Todo todo) {
        return TodoResponseDto.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .dueDate(todo.getDueDate())
                .category(todo.getCategory())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}
