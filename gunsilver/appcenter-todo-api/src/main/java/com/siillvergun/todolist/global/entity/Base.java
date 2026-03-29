package com.siillvergun.todolist.global.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(value = AuditingEntityListener.class)
public class Base {
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    protected LocalDateTime created_at;

    @LastModifiedDate
    @Column(name = "updated_at", updatable = false)
    protected LocalDateTime updated_at;
    protected Boolean is_deleted;
}
