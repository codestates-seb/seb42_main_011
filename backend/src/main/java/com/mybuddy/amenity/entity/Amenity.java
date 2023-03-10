package com.mybuddy.amenity.entity;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long amenityId;

    @Column(nullable = false)
    public String amenityName;

    @Column(nullable = false)
    public Long addressId;

    @Column(nullable = false)
    public String address;

    @Column(nullable = false)
    public Double latitude;

    @Column(nullable = false)
    public Double longitude;

    @Setter
    @ManyToOne
    @JoinColumn(name = "BULLETIN_POST_ID")
    public BulletinPost bulletinPost;

    @Builder(builderClassName = "CreateNewAmenity", builderMethodName = "CreateNewAmenity")
    public Amenity (Long addressId, String amenityName, String address, Double latitude, Double longitude) {
        this.addressId = addressId;
        this.amenityName = amenityName;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
