package com.mybuddy.search.mapper;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.member.entity.Member;
import com.mybuddy.search.dto.SearchMemberResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
                member.getMeAsFolloweeList().size(),
                member.getMeAsFollowerList().size()
        );
        return responseDto;
    };


    default List<SearchMemberResponseDto> membersToSearchResponseDtos(List<Member> members) {
        if (members == null) {
            return null;
        }

        List<SearchMemberResponseDto> list = new ArrayList<SearchMemberResponseDto>(members.size());
        for (Member member : members) {
            list.add(memberToSearchResponseDto(member));
        }

        List<SearchMemberResponseDto> result = list.stream()
                .sorted(Comparator.comparingLong(
                        SearchMemberResponseDto::getMemberId).reversed())
                .collect(Collectors.toList());

        return result;
    }

}
