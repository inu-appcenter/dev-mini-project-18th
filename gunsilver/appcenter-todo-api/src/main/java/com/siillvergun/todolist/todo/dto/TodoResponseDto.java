package com.siillvergun.todolist.todo.dto;

import com.siillvergun.todolist.todo.entity.Category;
import com.siillvergun.todolist.todo.entity.Todo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "할 일 응답 DTO")
public class TodoResponseDto {

    @Schema(description = "할 일 ID")
    private Long id;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "마감일")
    private LocalDate dueDate;

    @Schema(description = "카테고리")
    private Category category;

    @Schema(description = "완료 여부")
    private boolean completed;

    @Schema(description = "생성일")
    private LocalDateTime createdAt;

    @Schema(description = "수정일")
    private LocalDateTime updatedAt;

    public static TodoResponseDto from(Todo todo) {
        return TodoResponseDto.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .dueDate(todo.getDueDate())
                .category(todo.getCategory())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}
