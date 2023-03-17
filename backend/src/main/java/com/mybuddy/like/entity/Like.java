package com.mybuddy.like.entity;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.global.audit.Auditable;
import com.mybuddy.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "LIKES")
@NoArgsConstructor
@AllArgsConstructor
public class Like extends Auditable  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "BULLETIN_POST_ID")
    private BulletinPost bulletinPost;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getLikes().contains(this)){
            this.member.getLikes().add(this);
        }
    }

    public void setBulletinPost(BulletinPost bulletinPost) {
        this.bulletinPost = bulletinPost;
        if (!this.bulletinPost.getLikes().contains(this)){
            this.bulletinPost.getLikes().add(this);
        }
    }

}
