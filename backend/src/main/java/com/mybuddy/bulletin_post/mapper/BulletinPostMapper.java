package com.mybuddy.bulletin_post.mapper;

import com.mybuddy.amenity.dto.AmenityForMyPageResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.comment.dto.CommentResponseDto;
import com.mybuddy.like.service.LikeService;
import com.mybuddy.member.entity.Member;
import org.mapstruct.Mapper;
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


    default BulletinPostDto.Response bulletinPostToBulletinPostResponseDto(BulletinPost bulletinPost, BulletinPostService bulletinPostService, LikeService likeService, Long loginUserId) {

        if (bulletinPost == null) {
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
                                        comment.getMember().getDogName(),
                                        comment.getMember().getProfileUrl()
                                );
                                return commentResponse;
                            }
                    ).sorted(Comparator.comparingLong(CommentResponseDto::getCommentId).reversed())
                    .collect(Collectors.toList());
        }

        long postId = bulletinPost.getBulletinPostId();
        long likeCount = likeService.getLikeCount(bulletinPost.getBulletinPostId());
        int likeByUser = 0;
        if (loginUserId != null) {
            likeByUser = likeService.findExistLikeByMemberId(postId, loginUserId);
        }
        BulletinPostDto.Response bulletinPostResponseDto = new BulletinPostDto.Response(
                postId,
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

        if (bulletinPost == null) {
            return null;
        }

        Member member = bulletinPost.getMember();
        long postId = bulletinPost.getBulletinPostId();
        BulletinPostDto.ResponseForFeed bulletinPostResponseForFeedDto = new BulletinPostDto.ResponseForFeed(
                postId,
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

    default List<BulletinPostDto.ResponseForFeed> bulletinPostsToBulletinPostResponseForFeedDtos(List<BulletinPost> bulletinPosts) {
        if (bulletinPosts == null) {
            return null;
        }

        List<BulletinPostDto.ResponseForFeed> list = new ArrayList<BulletinPostDto.ResponseForFeed>(bulletinPosts.size());
        for (BulletinPost bulletinPost : bulletinPosts) {
            list.add(bulletinPostToBulletinPostResponseForFeedDto(bulletinPost));
        }

        List<BulletinPostDto.ResponseForFeed> result = list.stream()
                .sorted(Comparator.comparingLong(
                        BulletinPostDto.ResponseForFeed::getBulletinPostId).reversed())
                .collect(Collectors.toList());

        return result;
    }

}


