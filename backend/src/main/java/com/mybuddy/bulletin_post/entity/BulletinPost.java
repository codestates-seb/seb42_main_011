package com.mybuddy.bulletin_post.entity;

import com.mybuddy.comment.entity.Comment;
import com.mybuddy.global.audit.Auditable;
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
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;

////    bulletinPost, amenity N:1
//    @ManyToOne
//    @JoinColumn(name = "AMENITY_ID")
//    private Amenity amenity;

    @Column(nullable = false)
    private String photoUrl;

    @Column(columnDefinition = "TEXT")
    private String postContent;

////    bulletinPost, comment 1:N
//    @OneToMany(mappedBy = "bulletinPost", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Comment> commentList = new ArrayList<>();

////    bulletinPost, like 1:N
//    @OneToMany(mappedBy = "bulletinPost", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Like> likeList = new ArrayList<>();



//    public void setMember(Member member) {
//        this.member = member;
//        if (!this.member.getMyBulletinPosts().contains(this)){
//            this.member.getMyBulletinPosts().add(this);
//        }
//    }
//
//    public void setAmenity(Amenity amenity) {
//        this.amenity = amenity;
//        if (!this.amenity.getBulletinPosts().contains(this)){
//            this.amenity.getBulletinPosts().add(this);
//        }
//    }
//
//    public void setComment(Comment comment) {
//        this.commentList.add(comment);
//        if (comment.getBulletinPost() != this) {
//            comment.setBulletinPost(this);
//        }
//    }
//
//    public void setLike(Like like) {
//        this.likeList.add(like);
//        if (like.getBulletinPost() != this) {
//            like.setBulletinPost(this);
//        }
//    }
//


}
