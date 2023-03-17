package com.mybuddy.bulletin_post.entity;

import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.global.audit.Auditable;
import com.mybuddy.like.entity.Like;
import com.mybuddy.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@NoArgsConstructor //사용이 되는지?
@AllArgsConstructor
public class BulletinPost extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bulletinPostId;

////    bulletinPost, member N:1
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

//    bulletinPost, amenity N:1
    @ManyToOne
    @JoinColumn(name = "AMENITY_ID")
    private Amenity amenity;

    @Column(nullable = false)
    private String photoUrl;

    @Column(columnDefinition = "TEXT")
    private String postContent;

//    bulletinPost, comment 1:N
    @OneToMany(mappedBy = "bulletinPost", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();

//    bulletinPost, like 1:N
    @OneToMany(mappedBy = "bulletinPost", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Like> likes = new ArrayList<>();



    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getBulletinPosts().contains(this)){
            this.member.getBulletinPosts().add(this);
        }
    }

    public void setAmenity(Amenity amenity) {
        this.amenity = amenity;
        if (!this.amenity.getBulletinPostList().contains(this)){
            this.amenity.getBulletinPostList().add(this);
        }
    }

    public void setComment(Comment comment) {
        this.comments.add(comment);
        if (comment.getBulletinPost() != this) {
            comment.setBulletinPost(this);
        }
    }

    public void setLike(Like like) {
        this.likes.add(like);
        if (like.getBulletinPost() != this) {
            like.setBulletinPost(this);
        }
    }


}
