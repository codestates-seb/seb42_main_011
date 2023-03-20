package com.mybuddy.bulletin_post.mapper;

import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.comment.dto.CommentResponseDto;
import com.mybuddy.like.entity.Like;
import com.mybuddy.like.service.LikeService;
import com.mybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface BulletinPostMapper {

//    @Mapping(source = "addressId", target = "amenity.addressId")
//    @Mapping(source = "amenityName", target = "amenity.amenityName")
//    @Mapping(source = "address", target = "amenity.address")
//    @Mapping(source = "longitude", target = "amenity.longitude")
//    @Mapping(source = "latitude", target = "amenity.latitude")
    BulletinPost bulletinPostCreateDtoToBulletinPost(BulletinPostDto.Create requestBody);

//    @Mapping(source = "addressId", target = "amenity.addressId")
//    @Mapping(source = "amenityName", target = "amenity.amenityName")
//    @Mapping(source = "address", target = "amenity.address")
//    @Mapping(source = "longitude", target = "amenity.longitude")
//    @Mapping(source = "latitude", target = "amenity.latitude")
    BulletinPost bulletinPostPatchDtoToBulletinPost(BulletinPostDto.Patch requestBody);



    default BulletinPostDto.Response bulletinPostToBulletinPostResponseDto(BulletinPost bulletinPost, BulletinPostService bulletinPostService, LikeService likeService) {

        if ( bulletinPost == null ) {
            return null;
        }

        Member member = bulletinPost.getMember();
        Amenity amenity = bulletinPost.getAmenity();

        List<CommentResponseDto> commentLists = new ArrayList<>();
        if (bulletinPost.getComments() != null) {
            commentLists = bulletinPost.getComments().stream()
                    .map(comment -> {
                                CommentResponseDto commentResponse = new CommentResponseDto(
                                        comment.getCommentId(),
                                        comment.getCommentContent(),
                                        comment.getMember().getMemberId(),
                                        comment.getMember().getNickname(),
                                        comment.getMember().getDogName()
                                );
                                return commentResponse;
                            }
                    ).sorted(Comparator.comparingLong(CommentResponseDto::getCommentId).reversed())
                    .collect(Collectors.toList());
        }

        long likeCount = likeService.getLikeCount(bulletinPost.getBulletinPostId());
        int likeByUser = likeService.findExistLikeByMemberId(bulletinPost.getBulletinPostId(), member.getMemberId());
        BulletinPostDto.Response bulletinPostResponseDto = new BulletinPostDto.Response(
                bulletinPost.getBulletinPostId(),
                bulletinPost.getPhotoUrl(),
                bulletinPost.getPostContent(),
                bulletinPost.getCreatedAt(),
                member.getMemberId(),
                member.getNickname(),
                member.getDogName(),
                member.getProfileUrl(),
                amenity.getAmenityId(),
                amenity.getAmenityName(),
                likeCount,
                likeByUser,
                commentLists,
                commentLists.size()
        );

        return bulletinPostResponseDto;
    }

    List<BulletinPostDto.Response> bulletinPostsToBulletinPostResponseDtos(List<BulletinPost> bulletinPosts);

    default BulletinPostDto.ResponseForFeed bulletinPostToBulletinPostResponseForFeedDto(BulletinPost bulletinPost) {

        if ( bulletinPost == null ) {
            return null;
        }

        Member member = bulletinPost.getMember();

        //commentList null로 반환하기로해서.. 혹시 모르니 남겨둠.
//        List<CommentResponseDto> commentLists = bulletinPost.getComments().stream()
//                .map(comment -> {
//                    CommentResponseDto commentResponse = new CommentResponseDto(
//                            comment.getCommentId(),
//                            comment.getCommentContent(),
//                            comment.getMember().getMemberId(),
//                            comment.getMember().getNickname(),
//                            comment.getMember().getDogName()
//                    );
//                    return commentResponse;
//                }
//                ).collect(Collectors.toList());

        BulletinPostDto.ResponseForFeed bulletinPostResponseForFeedDto = new BulletinPostDto.ResponseForFeed(
                bulletinPost.getBulletinPostId(),
                bulletinPost.getPhotoUrl(),
                bulletinPost.getPostContent(),
                member.getMemberId(),
                member.getNickname(),
                member.getDogName(),
                null,
                bulletinPost.getComments().size()
        );

        return bulletinPostResponseForFeedDto;
    }

    List<BulletinPostDto.ResponseForFeed> bulletinPostsToBulletinPostResponseForFeedDtos(List<BulletinPost> bulletinPosts);

}


