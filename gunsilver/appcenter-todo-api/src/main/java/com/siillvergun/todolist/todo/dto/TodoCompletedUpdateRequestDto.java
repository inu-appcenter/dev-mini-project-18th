package com.siillvergun.todolist.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoCompletedUpdateRequestDto {
    private boolean completed;
}
