package com.siillvergun.todolist.todo.controller;

import com.siillvergun.todolist.todo.dto.TodoCompletedUpdateRequestDto;
import com.siillvergun.todolist.todo.dto.TodoRequestDto;
import com.siillvergun.todolist.todo.dto.TodoResponseDto;
import com.siillvergun.todolist.todo.dto.TodoUpdateRequestDto;
import com.siillvergun.todolist.todo.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponseDto> createTodo(
            @RequestBody @Valid TodoRequestDto todoRequestDto
    ) {
        TodoResponseDto todoResponseDto = todoService.createTodo(todoRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(todoResponseDto);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponseDto>> getAllTodo(
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam LocalDate date
    ) {
        List<TodoResponseDto> todoResponseDtoList = todoService.getAllTodo(date, sort);
        return ResponseEntity.ok(todoResponseDtoList);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TodoResponseDto> updateTodo(
            @PathVariable Long id,
            @RequestBody @Valid TodoUpdateRequestDto todoUpdateRequestDto
    ) {
        TodoResponseDto todoResponseDto = todoService.updateTodo(id, todoUpdateRequestDto);
        return ResponseEntity.ok(todoResponseDto);
    }

    @PatchMapping("/{id}/completed")
    public ResponseEntity<TodoResponseDto> updateCompleted(
            @PathVariable Long id,
            @RequestBody TodoCompletedUpdateRequestDto requestDto) {
        return ResponseEntity.ok(todoService.updateCompleted(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}
