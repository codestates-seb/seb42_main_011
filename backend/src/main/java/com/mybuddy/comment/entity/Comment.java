package com.mybuddy.comment.entity;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.member.entity.Member;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(length = 1000, nullable = false)
    private String commentContent;

    @Column
    private LocalDateTime createdAt;

    @Setter
    @Column
    private LocalDateTime modifiedAt;


    @Setter
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Setter
    @ManyToOne
    @JoinColumn(name = "BULLETIN_POST_ID")
    private BulletinPost bulletinPost;


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

    @Builder(builderClassName = "testComment", builderMethodName = "testComment")
    public Comment(Long commentId, String commentContent, LocalDateTime createdAt, LocalDateTime modifiedAt, Member member, BulletinPost bulletinPost) {
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.member = member;
        this.bulletinPost = bulletinPost;
    }

}
