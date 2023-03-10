package com.mybuddy.member.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.mybuddy.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Setter
    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Setter
    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(length = 200)
    private String aboutMe;

    @Column(nullable = false, length = 20)
    private String dogName;

    @Column(nullable = false, length = 200)
    @Enumerated(value = EnumType.STRING)
    private DogGender dogGender;

    @Column(length = 2000)
    private String photoUrl;

    @Column
    private String location;

    @Column
    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.ACTIVE; // Excluded from Builder

    @Setter
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<BulletinPost> bulletinPosts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<Like> likes = new ArrayList<>();

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public void setDogName(String dogName) {
        this.dogName = dogName;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setMemberStatus(MemberStatus memberStatus) {
        this.memberStatus = memberStatus;
    }

//    public void setBulletinPosts(List<BulletinPost> bulletinPosts) {
//        this.bulletinPosts = bulletinPosts;
//    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

//    public void setLikes(List<Like> likes) {
//        this.likes = likes;
//    }

    @Builder
    public Member(Long memberId, String email, String password, String nickname, String aboutMe,
        String dogName, DogGender dogGender, String photoUrl, String location) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.aboutMe = aboutMe;
        this.dogName = dogName;
        this.dogGender = dogGender;
        this.photoUrl = photoUrl;
        this.location = location;
    }

    public enum DogGender {
        FEMALE("암컷"),
        MALE("수컷");

        @Getter
        private String dogGender;

        DogGender(String dogGender) {
            this.dogGender = dogGender;
        }
    }

    public enum MemberStatus {
        ACTIVE("활성"),
        DORMANT("휴면"),
        DELETED("탈퇴");

        @Getter
        private String memberStatus;

        MemberStatus(String memberStatus) {
            this.memberStatus = memberStatus;
        }
    }
}
