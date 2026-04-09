package com.siillvergun.todolist.todo.entity;

import com.siillvergun.todolist.global.entity.Base;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "todo")
public class Todo extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, name = "content", nullable = false)
    private String content;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    // boolean 기본값은 false, 명시적으로 써준 것
    @Column(name = "completed", nullable = false)
    private boolean completed = false;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, name = "category", nullable = false)
    private Category category;

    @Builder
    public Todo(String content, LocalDate dueDate, boolean completed, Category category) {
        this.content = content;
        this.dueDate = dueDate;
        this.completed = completed;
        this.category = category;
    }

    public void changeTodo(String content, LocalDate dueDate, Category category) {
        this.content = content;
        this.dueDate = dueDate;
        this.category = category;
    }

    public void changeCompleted(boolean isCompleted) {
        this.completed = isCompleted;
    }
}
