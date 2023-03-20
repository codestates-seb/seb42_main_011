package com.mybuddy.search.mapper;

import com.mybuddy.member.entity.Member;
import com.mybuddy.search.dto.SearchMemberResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SearchMapper {

    default SearchMemberResponseDto memberToSearchResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }
        SearchMemberResponseDto responseDto = new SearchMemberResponseDto(
                member.getMemberId(),
                member.getProfileUrl(),
                member.getNickname(),
                member.getDogName(),
                member.getFollowees().size(),
                member.getFollowers().size()
        );
        return responseDto;
    };

    List<SearchMemberResponseDto> membersToSearchResponseDtos(List<Member> members);
}
