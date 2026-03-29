package com.siillvergun.todolist.global.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(value = {AuditingEntityListener.class})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Base {
    @CreatedDate
    @Column(name = "createdAt", updatable = false, nullable = false)
    protected LocalDateTime created_at;

    @LastModifiedDate
    @Column(name = "updatedAt", nullable = false)
    protected LocalDateTime updated_at;
    protected Boolean is_deleted;
}
