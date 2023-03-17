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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Transactional
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

        //로그인 사용자 임시
        Long memberId = 1L;

        BulletinPost foundBulletinPost = findVerifiedBulletinPost(updateBulletinPost.getBulletinPostId());

        //작성자 아니면 예외 발생
        if (foundBulletinPost.getMember().getMemberId() != memberId)
            throw new RuntimeException("해당 게시물 작성자가 아닙니다.");

        Member foundMember = memberService.findExistMemberById(memberId);
        updateBulletinPost.setMember(foundMember);


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

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "bulletinPostId"));

//        로그인 유저 대신 임시
        Long memberId = 1L;


        //if 로그인유저 피드
        //일단 로그인유저 로직 확인해야해서 조건 true 넣음
        if (true) {
            return bulletinPostRepository.findAllFollowingPostsByMemberId(memberId, pageRequest);
        } else {
            //비로그인 유저 피드
            return bulletinPostRepository.findAll(pageRequest);
        }


    }

//    public Page<BulletinPost> findBulletinPostsByMemberId(long memberId, int page, int size) {
//
//        return bulletinPostRepository.findByMemberId(memberId, PageRequest.of(page, size, Sort.by("bulletinPostId").descending()));
//    }


    public void deleteBulletinPost(long bulletinPostId) {

//        로그인 유저 대신 임시
        Long memberId = 1L;

        //작성자 아니면 예외 발생
        if (findVerifiedBulletinPost(bulletinPostId).getMember().getMemberId() != memberId)
            throw new RuntimeException("해당 게시물 작성자가 아닙니다.");
        else {
            BulletinPost obtainedBulletinPost = findVerifiedBulletinPost(bulletinPostId);
            bulletinPostRepository.delete(obtainedBulletinPost);
        }
    }


    public BulletinPost findVerifiedBulletinPost(long bulletinPostId) {

        Optional<BulletinPost> optionalBulletinPost =
                bulletinPostRepository.findById(bulletinPostId);

        BulletinPost obtainedBulletinPost =
                optionalBulletinPost.orElseThrow(() ->
                        new RuntimeException());

        return obtainedBulletinPost;
    }

    public long getCommentCount(long bulletinPostId) {

        //이렇게 할지
//        List<Comment> commentList = commentService.getCommentsByBulletinPostId(bulletinPostId);
//        long commentCount = commentList.size();

        //아니면 쿼리dsl?
        long commentCount = bulletinPostRepository.findCommentsByBulletinPostId(bulletinPostId);

        //길이는 그게 그거 같음
        // 다만 list 불러와서 세는건 있던 메서드 가져오는거고 쿼리dsl은 새로 만들어써야했단거 정도?

        return commentCount;
    }


}
