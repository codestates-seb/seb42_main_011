package com.mybuddy.bulletin_post.mapper;

import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.comment.dto.CommentResponseDto;
import com.mybuddy.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

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



    default BulletinPostDto.Response bulletinPostToBulletinPostResponseDto(BulletinPost bulletinPost) {

        if ( bulletinPost == null ) {
            return null;
        }

        Member member = bulletinPost.getMember();
        Amenity amenity = bulletinPost.getAmenity();

        List<CommentResponseDto> commentLists = bulletinPost.getCommentList().stream()
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

        //like count, like chosen 추후수정
//        likeCount = bulletinPostService.getLikeCount(bulletinPostId);
//        likeChosen = bullentinPostService.getLikeChosen(bulletinPostId, memberId);
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
                1,
                2,
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

        List<CommentResponseDto> commentLists = bulletinPost.getCommentList().stream()
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
                ).collect(Collectors.toList());

        BulletinPostDto.ResponseForFeed bulletinPostResponseForFeedDto = new BulletinPostDto.ResponseForFeed(
                bulletinPost.getBulletinPostId(),
                bulletinPost.getPhotoUrl(),
                bulletinPost.getPostContent(),
                member.getMemberId(),
                member.getNickname(),
                member.getDogName(),
                commentLists,
                commentLists.size()
        );

        return bulletinPostResponseForFeedDto;
    }

    List<BulletinPostDto.ResponseForFeed> bulletinPostsToBulletinPostResponseForFeedDtos(List<BulletinPost> bulletinPosts);

}


