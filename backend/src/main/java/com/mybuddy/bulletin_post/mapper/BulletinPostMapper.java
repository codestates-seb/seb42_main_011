package com.mybuddy.bulletin_post.mapper;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

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

//    @Mapping(source = "member.memberId", target = "memberId")
//    @Mapping(source = "member.nickname", target = "nickname")
//    @Mapping(source = "member.dogName", target = "dogName")
//    @Mapping(source = "member.profileUrl", target = "profileUrl")
//    @Mapping(source = "amenity.amenityId", target = "amenityId")
//    @Mapping(source = "amenity.amenityName", target = "amenityName")
    BulletinPostDto.Response BulletinPostToBulletinPostResponseDto(BulletinPost bulletinPost);

//    수동매핑 로직
//    default BulletinPostResponseDto questionToBulletinPostResponseDto(BulletinPost question) {
//
//        if ( question == null ) {
//            return null;
//        }
//
//        Member member = question.getMember();
//        VoteQ voteQ = question.getVoteQ();
//        long questionId = question.getBulletinPostId();
//        List<AnswerDto.Response> answers = question.getAnswerList().stream()
//                .map(answer -> {
//                    AnswerDto.Response answerResponse = new AnswerDto.Response();
//                    answerResponse.setAnswerId(answer.getAnswerId());
//                    answerResponse.setBulletinPostId(questionId);
//                    answerResponse.setMemberId(answer.getMember().getMemberId());
//                    answerResponse.setContents(answer.getContents());
//                    answerResponse.setVoteACount(answer.getVoteA().getVoteACount());
//                    return answerResponse;
//                }).collect(Collectors.toList());
//        BulletinPostResponseDto questionResponseDto = new BulletinPostResponseDto(questionId, question.getBulletinPostTitle(), question.getCreatedAt(), question.getBulletinPostContents(), question.getBulletinPostTrial(), member.getMemberId(), voteQ.getVoteQCount(), answers);
//        return questionResponseDto;
//    }

    List<BulletinPostDto.Response> bulletinPostsToBulletinPostResponseDtos(List<BulletinPost> bulletinPosts);
    List<BulletinPostDto.ResponseForFeed> bulletinPostsToBulletinPostResponseForFeedDtos(List<BulletinPost> bulletinPosts);

}
