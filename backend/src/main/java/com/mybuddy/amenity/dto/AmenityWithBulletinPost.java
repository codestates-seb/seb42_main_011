package com.mybuddy.amenity.dto;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.global.utils.PageInfo;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class AmenityWithBulletinPost {

    private Long addressId;
    private String amenityName;
    private String address;
    private Double longitude;
    private Double latitude;

     private List<BulletinPostDto.ResponseForFeed> bulletinPosts;

    private PageInfo pageInfo;
    //AmenityCustomRepository에서 처리하려면 여기에 PageInfo가 필요해져서 추가 됨
    //다음 수정 시 ApiMultiResponse를 이용해 처리할 예정(2023.03.12 강지은)

     @Builder
    public AmenityWithBulletinPost(Long addressId, String amenityName, String address, Double longitude, Double latitude, List<BulletinPostDto.ResponseForFeed> bulletinPosts, Page page) {
        this.addressId = addressId;
        this.amenityName = amenityName;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.bulletinPosts = bulletinPosts;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                 page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
