package com.mybuddy.follow.mapper;

import com.mybuddy.follow.dto.FollowResponseDto;
import com.mybuddy.member.entity.Member;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FollowMapper {

    @Named("FRTFR")
    @Mapping(source = "follower.memberId", target = "memberId")
    @Mapping(source = "follower.nickname", target = "nickname")
    @Mapping(source = "follower.dogName", target = "dogName")
    @Mapping(source = "follower.profileUrl", target = "profileUrl")
    FollowResponseDto followerToFollowResponseDto(Member follower);

    @IterableMapping(qualifiedByName = "FRTFR")
    List<FollowResponseDto> followersToFollowResponseDtos(List<Member> followers);

    @Named("FETFR")
    @Mapping(source = "followee.memberId", target = "memberId")
    @Mapping(source = "followee.nickname", target = "nickname")
    @Mapping(source = "followee.dogName", target = "dogName")
    @Mapping(source = "followee.profileUrl", target = "profileUrl")
    FollowResponseDto followeeToFollowResponseDto(Member followee);

    @IterableMapping(qualifiedByName = "FETFR")
    List<FollowResponseDto> followeesToFollowResponseDtos(List<Member> followees);
}
