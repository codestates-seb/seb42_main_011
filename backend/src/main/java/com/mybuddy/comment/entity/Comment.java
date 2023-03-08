package com.mybuddy.comment.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long commentId;

    @Column(length = 1000, nullable = false)
    public String commentContent;

    @Column
    public LocalDateTime createdAt;

    @Setter
    @Column
    public LocalDateTime modifiedAt;

    /*

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    public Member member;

    @ManyToOne
    @JoinColumn(name = "BULLETIN_POST_ID")
    public BulletinPost bulletinPost;

     */

    public void updateContent(String commentContent) {
        this.commentContent = commentContent;
        this.modifiedAt = LocalDateTime.now();
    }

    @Builder(builderClassName = "CreateNewComment", builderMethodName = "CreateNewComment")
    public Comment (String commentContent) {
        this.commentContent = commentContent;
        this.createdAt = LocalDateTime.now();
        this.modifiedAt = LocalDateTime.now();
    }
    @Builder(builderClassName = "UpdateComment", builderMethodName = "UpdateComment")
    public Comment (Long commentId, String commentContent) {
        this.commentId = commentId;
        this.commentContent = commentContent;
    }
}
