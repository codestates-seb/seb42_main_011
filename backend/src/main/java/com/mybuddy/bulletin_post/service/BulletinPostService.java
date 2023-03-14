package com.mybuddy.bulletin_post.service;

import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.comment.service.CommentService;
import com.mybuddy.global.storage.StorageService;
import com.mybuddy.global.utils.CustomBeanUtils;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BulletinPostService {

    private final BulletinPostRepository bulletinPostRepository;
    private final MemberServiceImpl memberService;
    private final CustomBeanUtils<BulletinPost> customBeanUtils;
    private final StorageService storageService;
    private final CommentService commentService;

    public BulletinPost createBulletinPost(BulletinPost bulletinPost, Amenity amenity, MultipartFile photoImage) {

//        multipartFile을 저장소에 저장하고 해당 photoUrl 가져오는 service 메서드
        storageService.storeImage(photoImage);
        bulletinPost.setPhotoUrl(
                        storageService.getPath() + "/" + photoImage.getOriginalFilename());

//        controller에서 memberId 찾아서 먼저 저장해야하려나
//        Member member = bulletinPost.getMember();
//        Member foundMember = memberService.findExistMemberById(member.getMemberId());

        Long memberId = 1L;
        Member foundMember = memberService.findExistMemberById(memberId);
        bulletinPost.setMember(foundMember);

        //amenity 연결
        bulletinPost.setAmenity(amenity);

        BulletinPost createdBulletinPost = bulletinPostRepository.save(bulletinPost);

        return createdBulletinPost;
    }

    public BulletinPost updateBulletinPost(BulletinPost updateBulletinPost, Amenity amenity, MultipartFile photoImage) {

        //findExistMemberById(Long memberId) 가져오기? 로그인 사용자 확인하기?

        Long memberId = 1L;
        Member foundMember = memberService.findExistMemberById(memberId);
        updateBulletinPost.setMember(foundMember);

        BulletinPost foundBulletinPost = findVerifiedBulletinPost(updateBulletinPost.getBulletinPostId());

        BulletinPost bulletinPost = customBeanUtils.copyNonNullProperties(updateBulletinPost, foundBulletinPost);

        Optional.ofNullable(photoImage)
                .ifPresent(storageService::storeImage);
        Optional.ofNullable(photoImage)
                .ifPresent(image -> bulletinPost.setPhotoUrl(
                        storageService.getPath() + "/" + image.getOriginalFilename())
                );

        //amenity 연결
        bulletinPost.setAmenity(amenity);

        BulletinPost updatedBulletinPost = bulletinPostRepository.save(bulletinPost);

        return updatedBulletinPost;
    }

    public BulletinPost findBulletinPost(long bulletinPostId) {

        BulletinPost bulletinPost = findVerifiedBulletinPost(bulletinPostId);

        return bulletinPost;
    }




    public Page<BulletinPost> findBulletinPosts(int page, int size) {

        //로그인 멤버 가져오기
        //if 로그인 확인시 //팔로잉 하는 계정들에서.

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

//        if 로그인유저

//        bulletinPostCustomRepositoryImpl에 findAllFollowingPostsByMemberId(memberId, pageable) 메서드
//        Optional<Page<BulletinPost>> optionalPage = bulletinPostRepository.findAllFollowingPostsByMemberId(memberId, pageable);
//
//        Page<BulletinPost> findPage =
//                optionalPage.orElseThrow(() ->
//                        new RuntimeException());
//        return findPage;

//        else 비로그인시 find All 이거 그대로.

        Page<BulletinPost> bulletinPosts = bulletinPostRepository.findAll(pageable);

        return bulletinPosts;
    }

    public Page<BulletinPost> findBulletinPostsByMemberId(long memberId, int page, int size) {


        Pageable pageable = PageRequest.of(page, size);

        Optional<Page<BulletinPost>> optionalPage = bulletinPostRepository.findByMemberMemberId(memberId, pageable);

        Page<BulletinPost> findPage =
                optionalPage.orElseThrow(() ->
                        new RuntimeException());

        return findPage;
    }


    public void deleteBulletinPost(long bulletinPostId) {

        BulletinPost findBulletinPost = findVerifiedBulletinPost(bulletinPostId);

        bulletinPostRepository.delete(findBulletinPost);
    }


    public BulletinPost findVerifiedBulletinPost(long bulletinPostId) {

        Optional<BulletinPost> optionalBulletinPost =
                bulletinPostRepository.findById(bulletinPostId);

        BulletinPost findBulletinPost =
                optionalBulletinPost.orElseThrow(() ->
                        new RuntimeException());

        return findBulletinPost;
    }

    public long getCommentCount(long bulletinPostId) {

        //이렇게 할지 아니면 디비에서 comment 갯수를 세오는 쿼리문을 만들어야 할지
        //쿼리문으로 해야할거 같긴 한데..
        List<Comment> commentList = commentService.getCommentsByBulletinPostId(bulletinPostId);
        long commentCount = commentList.size();

        return commentCount;
    }

//    public long getLikeCount(long bulletinPostId) {
//
//        BulletinPost bulletinPost = findVerifiedBulletinPost(bulletinPostId);
//        List<Like> likeList = bulletinPost.getLikeList();
//        long likeCount = likeList.size();
//
//        return likeCount;
//    }

//    이렇게 해야할지 아니면 아예 likeservice 에서 findExistLikeByMemberId를 getLikeChosen 메서드명으로 해서 바로 소환해야할지..?
//    public long getLikeChosen(long bulletinPostId, long memberId) {
//
//        //이 메서드 결과 값을 if로 나눠서 0 또는 1로
//        long OneIfExist = likeService.findExistLikeByMemberId(long bulletinPostId, long memberId);
//
//        return OneIfExist;
//    }


}
