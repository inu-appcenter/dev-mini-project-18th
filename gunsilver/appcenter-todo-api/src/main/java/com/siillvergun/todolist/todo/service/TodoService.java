package com.siillvergun.todolist.todo.service;

import com.siillvergun.todolist.todo.dto.TodoRequestDto;
import com.siillvergun.todolist.todo.dto.TodoResponseDto;
import com.siillvergun.todolist.todo.entity.Todo;
import com.siillvergun.todolist.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    @Transactional
    public TodoResponseDto createTodo(TodoRequestDto todoRequestDto) {
        Todo todo = todoRequestDto.toEntity();
        return TodoResponseDto.from(todoRepository.save(todo));
    }

    public List<TodoResponseDto> getAllTodo() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map(TodoResponseDto::from).toList();
    }

    private Todo findTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Todo not found"));
    }

    public void deleteTodo(Long id) {
        Todo todo = findTodoById(id);
        todoRepository.delete(todo);
    }
}
