package com.mybuddy.search.mapper;

import com.mybuddy.member.entity.Member;
import com.mybuddy.search.dto.SearchResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SearchMapper {

    @Mapping(source = "nickname", target = "")
    default SearchResponseDto memberToSearchResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }
        SearchResponseDto responseDto = new SearchResponseDto(
                member.getMemberId(),
                member.getProfileUrl(),
                member.getNickname(),
                member.getDogName(),
                member.getFollowers().size(),
                member.getFollowees().size()
        );
        return responseDto;
    };

    List<SearchResponseDto> membersToSearchResponseDtos(List<Member> members);
}
