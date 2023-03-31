package com.mybuddy.bulletin_post.service;

import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import com.mybuddy.follow.entity.Follow;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.storage.StorageService;
import com.mybuddy.global.utils.CustomBeanUtils;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BulletinPostService {

    private final BulletinPostRepository bulletinPostRepository;
    private final CustomBeanUtils<BulletinPost> customBeanUtils;


    public BulletinPost createPost(BulletinPost bulletinPost, Long loginUserId, Amenity amenity, MemberServiceImpl memberService, StorageService storageService, MultipartFile photoImage) {

        Member member = memberService.findExistMemberById(loginUserId);

//        multipartFile을 저장소에 저장하고 해당 photoUrl 가져오는 service 메서드
        String photoUrl = storageService.storeImage(photoImage);
        bulletinPost.setPhotoUrl(photoUrl);

        bulletinPost.setMember(member);

        if (amenity != null) {
            bulletinPost.setAmenity(amenity);
        }

        BulletinPost createdBulletinPost = bulletinPostRepository.save(bulletinPost);

        return createdBulletinPost;
    }


    public BulletinPost updatePost(BulletinPost updateBulletinPost, long postId, Long loginUserId, Amenity amenity, MemberServiceImpl memberService, StorageService storageService, MultipartFile photoImage) {

        updateBulletinPost.setBulletinPostId(postId);

        BulletinPost obtainedBulletinPost = findVerifiedBulletinPost(postId);

        verifyResourceOwner(obtainedBulletinPost, loginUserId);

        //amenity 연결
        if (amenity.getAmenityName() != null) {
            updateBulletinPost.setAmenity(amenity);
        }
        BulletinPost bulletinPost = customBeanUtils.copyNonNullProperties(updateBulletinPost, obtainedBulletinPost);

        Optional.ofNullable(photoImage)
                .ifPresent(image ->
                        bulletinPost.setPhotoUrl(
                                storageService.storeImage(image)));


        BulletinPost updatedBulletinPost = bulletinPostRepository.save(bulletinPost);

        return updatedBulletinPost;
    }


    public BulletinPost findPost(long bulletinPostId) {

        //if login user likeByUser 확인
        BulletinPost bulletinPost = findVerifiedBulletinPost(bulletinPostId);

        return bulletinPost;
    }


    public Page<BulletinPost> findPosts(Long loginUserId, int page, int size, MemberServiceImpl memberService) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "bulletinPostId"));

        //로그인유저 피드
        if (loginUserId != null) {
            List<Follow> meAsFollowerList = memberService.getMember(loginUserId).getMeAsFollowerList();

            Page<BulletinPost> result = bulletinPostRepository.findAllFollowingPostsByMemberId(meAsFollowerList, pageRequest);

            //게시물이 없으면 비로그인 유저 피드와 같은 결과 나오도록 if 필터
            if (!result.isEmpty())
                return result;
        }

        return bulletinPostRepository.findAll(pageRequest);

    }


    public void deletePost(long postId, Long loginUserId, MemberServiceImpl memberService, StorageService storageService) {

        BulletinPost bulletinPost = findPost(postId);

        verifyResourceOwner(bulletinPost, loginUserId);

        storageService.deleteImage(bulletinPost.getPhotoUrl());

        bulletinPostRepository.delete(bulletinPost);
    }


    public BulletinPost findVerifiedBulletinPost(long bulletinPostId) {

        Optional<BulletinPost> optionalBulletinPost =
                bulletinPostRepository.findById(bulletinPostId);

        BulletinPost obtainedBulletinPost =
                optionalBulletinPost.orElseThrow(() ->
                        new LogicException(LogicExceptionCode.BULLETIN_POST_NOT_FOUND));

        return obtainedBulletinPost;
    }


    //지금은 쓰이지 않지만 추후 리팩토링시 고려
    public long getCommentCount(long bulletinPostId) {

        //이렇게 할지
//        List<Comment> commentList = commentService.getCommentsByBulletinPostId(bulletinPostId);
//        long commentCount = commentList.size();

        //쿼리dsl
        long commentCount = bulletinPostRepository.findNumberOfCommentsByPostId(bulletinPostId);

        //길이는 비슷함
        // 다만 list 불러와서 세는건 있던 메서드 가져오는거고 쿼리dsl은 새로 만들어써야했단거 정도?

        return commentCount;
    }


    private void verifyResourceOwner(BulletinPost bulletinPost, Long loginUserId) {

        if (!bulletinPost.getMember().getMemberId().equals(loginUserId))
            throw new LogicException(LogicExceptionCode.NOT_RESOURCE_OWNER);
    }

}
