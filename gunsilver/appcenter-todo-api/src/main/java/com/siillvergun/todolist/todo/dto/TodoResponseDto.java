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
public class TodoResponseDto {
    private Long id;
    private String content;
    private LocalDate dueDate;
    private String category;
    private Boolean completed;

    public static TodoResponseDto from(Todo todo){
        return TodoResponseDto.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .dueDate(todo.getDueDate())
                .category(todo.getCategory())
                .completed(todo.isCompleted())
                .build();
    }
}
