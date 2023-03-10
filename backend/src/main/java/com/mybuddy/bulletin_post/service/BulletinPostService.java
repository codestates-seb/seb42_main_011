package com.mybuddy.bulletin_post.service;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BulletinPostService {


//        관련 메서드, 로직 만들기 이걸 service단에다..? response dto단에다? controller단에다?
//        private long likeCount = bulletinPostService.getLikeCount(bulletinPostId);
//        private int likeChosen = bullentinPostService.getLikeChosen(bulletinPostId, memberId);


    private final BulletinPostRepository bulletinPostRepository;

    public BulletinPost createBulletinPost(BulletinPost bulletinPost) {

//        multipartFile을 S3에 저장하고 해당 photoUrl 가져오는 service 메서드

//        findVerifiedMember 가져오기
//        Member member = bulletinPost.getMember();
//        memberService.findVerifiedMember(member.getEmail());

        //임시
        bulletinPost.setPhotoUrl("/photoUrl/blah/blah/blah");

        BulletinPost createdBulletinPost = bulletinPostRepository.save(bulletinPost);

        return createdBulletinPost;
    }

    public BulletinPost updateBulletinPost(BulletinPost updateBulletinPost) {

        //findExistMemberById(Long memberId) 가져오기

        BulletinPost bulletinPost = findVerifiedBulletinPost(updateBulletinPost.getBulletinPostId());

        Optional.ofNullable(updateBulletinPost.getPostContent())
                .ifPresent(content -> bulletinPost.setPostContent(content));

        //임시
        bulletinPost.setPhotoUrl("/photoUrl/l/b/h");

        BulletinPost updatedBulletinPost = bulletinPostRepository.save(bulletinPost);
        return updatedBulletinPost;
    }

    public BulletinPost findBulletinPost(long bulletinPostId) {

        BulletinPost bulletinPost = findVerifiedBulletinPost(bulletinPostId);


        return bulletinPost;
    }

    public Page<BulletinPost> findBulletinPosts(int page, int size) {

        //findExistMemberById(Long memberId) 가져오기
        //if 로그인 확인시 //팔로잉 하는 계정들에서.

//        Pageable pageable = PageRequest.of(page, size);
////        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "likeCount 고쳐서쓰기"));
//
//        Optional<Page<BulletinPost>> optionalPage = bulletinPostRepository.findBy~~(memberId, pageable);
//
//        Page<BulletinPost> findPage =
//                optionalPage.orElseThrow(() ->
//                        new RuntimeException());
//        return findPage;

        //else 비로그인시 find All 이거 그대로.

        Page<BulletinPost> bulletinPosts = bulletinPostRepository.findAll(PageRequest.of(page, size));

        return bulletinPosts;
    }

    public Page<BulletinPost> findBulletinPostsByMemberId(long memberId, int page, int size) {

        //authentication에서
        //findExistMemberById(Long memberId) 가져오기

//        Pageable pageable = PageRequest.of(page, size);
////        Pageable pageable = PageRequest.of(page, size);
//
//        Optional<Page<BulletinPost>> optionalPage = bulletinPostRepository.findByBulletinByMemberId(memberId, pageable);
//
//        Page<BulletinPost> findPage =
//                optionalPage.orElseThrow(() ->
//                        new RuntimeException());
//        return findPage;

        //임시
        Page<BulletinPost> bulletinPosts = bulletinPostRepository.findAll(PageRequest.of(page, size));

        return bulletinPosts;
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


}
