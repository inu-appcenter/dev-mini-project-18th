package com.siillvergun.todolist.todo.service;

import com.siillvergun.todolist.global.exception.CustomError;
import com.siillvergun.todolist.global.exception.ErrorCode;
import com.siillvergun.todolist.todo.dto.TodoRequestDto;
import com.siillvergun.todolist.todo.dto.TodoResponseDto;
import com.siillvergun.todolist.todo.dto.TodoUpdateRequestDto;
import com.siillvergun.todolist.todo.entity.Todo;
import com.siillvergun.todolist.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    @Transactional
    public TodoResponseDto createTodo(TodoRequestDto todoRequestDto) {
        Todo todo = todoRequestDto.toEntity();
        return TodoResponseDto.from(todoRepository.save(todo));
    }

    @Transactional(readOnly = true)
    public List<TodoResponseDto> getAllTodo(LocalDate date, String sortType) {
        Sort sort = switch (sortType) {
            case "생성순" -> Sort.by(Sort.Direction.DESC, "createdAt");
            case "카테고리순" -> Sort.by(Sort.Direction.ASC, "category");
            default -> throw new CustomError(ErrorCode.INVALID_INPUT_VALUE);
        };

        List<Todo> todos = todoRepository.findAllByDueDate(date, sort); // 페이지네이션으로 리펙토링
        return todos.stream().map(TodoResponseDto::from).toList();
    }

    private Todo findTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new CustomError(ErrorCode.TODO_NOT_FOUND));
    }

    @Transactional
    public TodoResponseDto updateTodo(Long id, TodoUpdateRequestDto requestDto) {
        Todo todo = findTodoById(id);

        todo.changeTodo(requestDto.getContent(), requestDto.getDueDate(), requestDto.getCategory(), requestDto.isCompleted());

        return TodoResponseDto.from(todo);
    }

    @Transactional
    public void deleteTodo(Long id) {
        Todo todo = findTodoById(id);
        todoRepository.delete(todo);
    }
}
