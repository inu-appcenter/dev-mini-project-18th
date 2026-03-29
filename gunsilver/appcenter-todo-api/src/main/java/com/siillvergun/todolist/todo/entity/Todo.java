package com.siillvergun.todolist.todo.entity;

import com.siillvergun.todolist.global.entity.Base;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(length = 20, name = "category", nullable = false)
    private String category;
}
