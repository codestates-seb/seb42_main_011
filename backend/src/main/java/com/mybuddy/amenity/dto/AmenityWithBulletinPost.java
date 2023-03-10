package com.mybuddy.amenity.dto;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import lombok.Getter;

import java.util.List;

@Getter
public class AmenityWithBulletinPost {

    private Long addressId;
    private String amenityName;
    private String address;
    private Double longitude;
    private Double latitude;

    // 태그된 bulletinPost응답 dto 담기
    // public List<BulletinPostDto>;

}
