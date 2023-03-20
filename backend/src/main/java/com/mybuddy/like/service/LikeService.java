package com.mybuddy.like.service;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
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

    public Like createLike(long postId, Long loginUserId) {

        Like like = new Like();

        if (findExistLikeByMemberId(postId, loginUserId) == 1)
            throw new LogicException(LogicExceptionCode.LIKE_NOT_POSSIBLE);
        else {
            Member foundMember = memberService.findExistMemberById(loginUserId);
            like.setMember(foundMember);
            like.setBulletinPost(bulletinPostService.findVerifiedBulletinPost(postId));

            return likeRepository.save(like);
        }
    }

    public void deleteLike(long postId, Long loginUserId) {


        //해당 게시물에 해당 멤버가 좋아요 누른게 없으면 null
        Optional<Like> optionalLike = likeRepository.findByPostAndMemberId(postId, loginUserId);
        //null 받으면 이거 좋아요 해둔게 없으니까 exception
        Like obtainedLike =
                optionalLike.orElseThrow(() ->
                        new LogicException(LogicExceptionCode.CANCEL_LIKE_NOT_POSSIBLE));

        likeRepository.delete(obtainedLike);
    }


//    likeByUser
    public int findExistLikeByMemberId(long postId, long memberId){
        Optional<Like> optionalLike = likeRepository.findByPostAndMemberId(postId, memberId);

        // 해당 게시물에 해당 멤버가 좋아요 안했으면 0, 했으면 1 반환
        if (optionalLike.isEmpty()) return 0;
        else return 1;
    };

    public long getLikeCount(long bulletinPostId) {

        //getCommentCount 쿼리 dsl로 해봤으니 굳이 해보지 않는다!
        BulletinPost bulletinPost = bulletinPostService.findVerifiedBulletinPost(bulletinPostId);
        List<Like> likeList = bulletinPost.getLikes();

        if (likeList == null)
            return 0;

        return likeList.size();
    }
}
