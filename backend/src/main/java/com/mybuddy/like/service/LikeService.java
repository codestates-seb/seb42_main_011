package com.mybuddy.like.service;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.like.entity.Like;
import com.mybuddy.like.repository.LikeRepository;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final BulletinPostService bulletinPostService;
    private final MemberServiceImpl memberService;

    public Like createLike(long postId) {

        Like like = new Like();
        //로그인 유저 가져오기 전 임시
        Long memberId = 1L;

        if (findExistLikeByMemberId(postId, memberId) == 1)
            throw new RuntimeException("좋아요를 이미 눌렀습니다.");
        else {
            Member foundMember = memberService.findExistMemberById(memberId);
            like.setMember(foundMember);
            like.setBulletinPost(bulletinPostService.findVerifiedBulletinPost(postId));

            return likeRepository.save(like);
        }
    }

    public void deleteLike(long postId) {

        //로그인 유저 모르니 임시로
        Long memberId = 1L;

        //해당 게시물에 해당 멤버가 좋아요 누른게 없으면 null
        Optional<Like> optionalLike = likeRepository.findByPostAndMemberId(postId, memberId);
        //null 받으면 이거 좋아요 해둔게 없으니까 exception 발생시켜. exception 종류는 나중에..
        Like obtainedLike =
                optionalLike.orElseThrow(() ->
                        new RuntimeException("좋아요를 누른 게시물이 아닙니다."));

        likeRepository.delete(obtainedLike);
    }

    public Like findVerifiedLike(long likeId) {

        Optional<Like> optionalLike =
                likeRepository.findById(likeId);

        Like obtainedLike =
                optionalLike.orElseThrow(() ->
                        new RuntimeException());

        return obtainedLike;
    }

//    likeByUser
    public int findExistLikeByMemberId(long postId, long memberId){
        Optional<Like> optionalLike = likeRepository.findByPostAndMemberId(postId, memberId);

        // 해당 게시물에 해당 멤버가 좋아요 안했으면 0, 했으면 1 반환
        if (optionalLike.isEmpty()) return 0;
        else return 1;
    };

    public long getLikeCount(long bulletinPostId) {

        //일단은 리스트째로 가져왔는데 like 세오는 쿼리문 만들기.
        BulletinPost bulletinPost = bulletinPostService.findVerifiedBulletinPost(bulletinPostId);
        List<Like> likeList = bulletinPost.getLikes();

        if (likeList == null)
            return 0;

        return likeList.size();
    }
}
