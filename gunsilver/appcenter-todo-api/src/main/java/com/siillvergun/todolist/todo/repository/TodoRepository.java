package com.siillvergun.todolist.todo.repository;

import com.siillvergun.todolist.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
