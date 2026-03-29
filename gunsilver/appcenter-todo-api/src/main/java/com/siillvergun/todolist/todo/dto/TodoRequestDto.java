package com.siillvergun.todolist.todo.dto;

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
    private Long id;
    private String content;
    private LocalDate due_date;
    private String category;
    private Boolean completed;
}
