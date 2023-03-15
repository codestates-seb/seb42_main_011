package com.mybuddy.follow.entity;

import com.mybuddy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @Setter
    @ManyToOne
    @JoinColumn(name = "FOLLOWER_ID")
    private Member follower;

    @Setter
    @ManyToOne
    @JoinColumn(name = "FOLLOWEE_ID")
    private Member followee;

    @Builder
    public Follow(Long followId, Member follower, Member followee) {
        this.followId = followId;
        this.follower = follower;
        this.followee = followee;
    }
}
