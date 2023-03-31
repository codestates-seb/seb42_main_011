package com.mybuddy.amenity.entity;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long amenityId;

    @Column
    private String amenityName;

    @Column
    private Long addressId;

    @Column
    private String address;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Setter
    @OneToMany(mappedBy = "amenity")
    private List<BulletinPost> bulletinPostList = new ArrayList<>();

    @Builder(builderClassName = "CreateNewAmenity", builderMethodName = "CreateNewAmenity")
    public Amenity (Long addressId, String amenityName, String address, Double latitude, Double longitude) {
        this.addressId = addressId;
        this.amenityName = amenityName;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @Builder(builderClassName = "TestAmenity", builderMethodName = "TestAmenity")
    public Amenity (Long amenityId, Long addressId, String amenityName, String address, Double latitude, Double longitude) {
        this.amenityId = amenityId;
        this.addressId = addressId;
        this.amenityName = amenityName;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
