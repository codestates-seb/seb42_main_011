package com.mybuddy.like.mapper;

import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.like.dto.LikeResponseDto;
import com.mybuddy.like.entity.Like;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LikeMapper {

    //사실 매퍼이기보단 그냥 메서드 인데.. 일단 responseDto로 바꾸는 거긴 하니까 여기에?
    //인터페이스일 필요도 없긴 하지만 나중에 다른 기능이 필요할 수 있으니 매퍼로 일단!
    default LikeResponseDto toLikeResponseDto(long postId, BulletinPostService bulletinPostService) {

        LikeResponseDto likeResponseDto = new LikeResponseDto();
        likeResponseDto.setLikeCount(bulletinPostService.getLikeCount(postId));

        return likeResponseDto;
    };




}
