package com.siillvergun.todolist.todo.repository;

import com.siillvergun.todolist.todo.entity.Todo;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByDueDate(LocalDate dueDate, Sort sort);
}
