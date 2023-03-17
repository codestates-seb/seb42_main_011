package com.mybuddy.global.mockdata;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.dto.AmenityForMyPageResponseDto;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.dto.BulletinPostForMyPageResponseDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.follow.dto.FollowResponseDto;
import com.mybuddy.follow.entity.Follow;
import com.mybuddy.member.dto.*;
import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MockTestData {

    public static class MockComment {
        public static Comment getComment() {
            return Comment.testComment()
                    .commentId(1L)
                    .commentContent("우와 콩이가 너무 귀여워요")
                    .build();
        }
    }

    public static class MockAmenity {

        public static AmenityCreateDto getAmenityCreateDto() {
            return AmenityCreateDto.builder()
                    .addressId(147221121221L)
                    .amenityName("강아지 놀이터")
                    .address("서울 광진구 어디로 348")
                    .longitude(126.12834637823106)
                    .latitude(126.12834637823106)
                    .build();
        }
        public static Amenity getAmenity() {
            return Amenity.TestAmenity()
                    .amenityId(1L)
                    .addressId(147221121221L)
                    .amenityName("강아지 놀이터")
                    .address("서울 광진구 어디로 348")
                    .longitude(126.12834637823106)
                    .latitude(126.12834637823106)
                    .build();
        }
        public static AmenityResponseDto getAmenityResponseDto() {
            return AmenityResponseDto.builder()
                    .amenityId(1L)
                    .addressId(147221121221L)
                    .amenityName("강아지 놀이터")
                    .address("서울 광진구 어디로 348")
                    .longitude(126.12834637823106)
                    .latitude(126.12834637823106)
                    .build();
        }

        public static List<BulletinPostDto.ResponseForFeed> getListBulletinPostFeed() {

            BulletinPostDto.ResponseForFeed responseForFeed1 = BulletinPostDto.ResponseForFeed.builder()
                    .bulletinPostId(1L)
                    .photoUrl("s3.mybuddy.image/userid-1.png")
                    .postContent("게시물 내용입니다.")
                    .memberId(1L)
                    .nickname("코딩김")
                    .dogName("왕밤톨")
                    .commentList(new ArrayList<>())
                    .commentCount(0)
                    .build();


            BulletinPostDto.ResponseForFeed responseForFeed2= BulletinPostDto.ResponseForFeed.builder()
                    .bulletinPostId(1L)
                    .photoUrl("s3.mybuddy.image/userid-1.png")
                    .postContent("게시물 내용입니다.")
                    .memberId(1L)
                    .nickname("코딩김")
                    .dogName("왕밤톨")
                    .commentList(new ArrayList<>())
                    .commentCount(0)
                    .build();

            return List.of(responseForFeed1, responseForFeed2);
        }
        public static List<BulletinPost> getListBulletinPost() {

            BulletinPost bulletinPost1 = BulletinPost.builder()
                    .bulletinPostId(1L)
                    .postContent("게시물 1.")
                    .amenity(Amenity.TestAmenity().amenityId(1L).build())
                    .build();

            BulletinPost bulletinPost2 = BulletinPost.builder()
                    .bulletinPostId(2L)
                    .postContent("게시물 2.")
                    .amenity(Amenity.TestAmenity().amenityId(1L).build())
                    .build();

            return List.of(bulletinPost1, bulletinPost2);
        }


        public static List<AmenityResponseDto> getRecommentAmenityList(){
            AmenityResponseDto amenity1 = AmenityResponseDto.builder()
                    .amenityId(1L)
                    .addressId(147221121221L)
                    .amenityName("강아지 놀이터")
                    .address("서울 광진구 어디로 348")
                    .longitude(126.12834637823106)
                    .latitude(36.128346378212108)
                    .bulletinPostCount(15L)
                    .build();
            AmenityResponseDto amenity2 = AmenityResponseDto.builder()
                    .amenityId(2L)
                    .addressId(32212482121L)
                    .amenityName("강아지 병원")
                    .address("서울 광진구 아무로 12")
                    .longitude(126.1283467825107)
                    .latitude(36.128346378212106)
                    .bulletinPostCount(10L)
                    .build();

            return List.of(amenity1, amenity2);
        }
    }

    public static class MockMember {
        public static Member getAdmin() {
            return Member.builder()
                    .memberId(1L)
                    .email("admin@mybuddy.com")
                    .password("admin")
                    .nickname("admin")
                    .dogName("admin")
                    .dogGender(Member.DogGender.MALE)
                    .build();
        }

        public static Member getMember() {
            return Member.builder()
                    .memberId(2L)
                    .email("kimcoding@mybuddy.com")
                    .password("asdf1234")
                    .nickname("김코딩")
                    .aboutMe("왕밤톨입니다.")
                    .dogName("왕밤톨")
                    .dogGender(Member.DogGender.MALE)
                    .profileUrl("www.mybuddy.com/bamtol-the-king.png")
                    .address("서울시 강북구")
                    .build();
        }

        public static Member getSecondMember() {
            return Member.builder()
                    .memberId(3L)
                    .email("hgd@mybuddy.com")
                    .password("asdf1234")
                    .nickname("홍길동")
                    .aboutMe("코리입니다.")
                    .dogName("코리")
                    .dogGender(Member.DogGender.FEMALE)
                    .profileUrl("www.mybuddy.com/corey.png")
                    .address("서울시 강북구")
                    .build();
        }

        public static List<Member> getMemberList() {
            Member member1 = Member.builder()
                    .memberId(2L)
                    .email("kimcoding@mybuddy.com")
                    .password("asdf1234")
                    .nickname("김코딩")
                    .aboutMe("왕밤톨입니다.")
                    .dogName("왕밤톨")
                    .dogGender(Member.DogGender.MALE)
                    .profileUrl("www.mybuddy.com/bamtol-the-king.png")
                    .address("서울시 강북구")
                    .build();

            Member member2 = Member.builder()
                    .memberId(3L)
                    .email("hgd@mybuddy.com")
                    .password("asdf1234")
                    .nickname("홍길동")
                    .aboutMe("코리입니다.")
                    .dogName("코리")
                    .dogGender(Member.DogGender.FEMALE)
                    .profileUrl("www.mybuddy.com/corey.png")
                    .address("서울시 강북구")
                    .build();

            return List.of(member1, member2);
        }

        public static MemberCreateDto getMemberCreateDto() {
            return MemberCreateDto.builder()
                    .email("kimcoding@mybuddy.com")
                    .password("asdf1234")
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .dogGender(Member.DogGender.MALE)
                    .build();
        }

        public static MemberUpdateDto getMemberPatchDto() {
            return MemberUpdateDto.builder()
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .address("서울시 강북구")
                    .aboutMe("왕밤톨입니다.")
                    .build();
        }

        public static List<BulletinPostForMyPageResponseDto> getBulletinPostForMyPageResponseDtos() {
            BulletinPostForMyPageResponseDto bulletinPostDto1 = BulletinPostForMyPageResponseDto.builder()
                    .bulletinPostId(1L)
                    .photoUrl("www.mybuddy.com/another-bamtol1.png")
                    .build();

            BulletinPostForMyPageResponseDto bulletinPostDto2 = BulletinPostForMyPageResponseDto.builder()
                    .bulletinPostId(2L)
                    .photoUrl("www.mybuddy.com/another-bamtol2.png")
                    .build();

            return List.of(bulletinPostDto1, bulletinPostDto2);
        }

        public static List<AmenityForMyPageResponseDto> getAmenityForMyPageResponseDtos() {
            AmenityForMyPageResponseDto amenityDto1 = AmenityForMyPageResponseDto.builder()
                    .amenityId(1L)
                    .amenityName("애견카페1")
                    .address("서울시 강북구 xx")
                    .photoUrl("www.dog-cafe1.com/map.png")
                    .postCreatedAt(LocalDateTime.now())
                    .build();

            AmenityForMyPageResponseDto amenityDto2 = AmenityForMyPageResponseDto.builder()
                    .amenityId(2L)
                    .amenityName("애견카페2")
                    .address("서울시 강북구 xx")
                    .photoUrl("www.dog-cafe2.com/map.png")
                    .postCreatedAt(LocalDateTime.now())
                    .build();

            return List.of(amenityDto1, amenityDto2);
        }

        public static MemberResponseDto getMemberResponseDto() {
            return MemberResponseDto.builder()
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .dogGender(com.mybuddy.member.entity.Member.DogGender.MALE)
                    .aboutMe("왕밤톨입니다.")
                    .followerNumber(0L)
                    .followeeNumber(0L)
                    .profileUrl("www.mybuddy.com/bamtol-the-king.png")
                    .bulletinPostForMyPageResponseDtos(getBulletinPostForMyPageResponseDtos())
                    .amenityForMyPageResponseDtos(getAmenityForMyPageResponseDtos())
                    .build();
        }

        public static List<MemberListResponseDto> getMemberListResponseDtos() {
            MemberListResponseDto listResponseDto1 = MemberListResponseDto.builder()
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .followerNumber(0L)
                    .followeeNumber(0L)
                    .profileUrl("www.mybuddy.com/bamtol-the-king.png")
                    .memberStatus(Member.MemberStatus.ACTIVE)
                    .build();

            MemberListResponseDto listResponseDto2 = MemberListResponseDto.builder()
                    .nickname("홍길동")
                    .dogName("뭉치")
                    .followerNumber(0L)
                    .followeeNumber(0L)
                    .profileUrl("www.mybuddy.com/ordinary-dog.png")
                    .memberStatus(Member.MemberStatus.ACTIVE)
                    .build();

            return List.of(listResponseDto1, listResponseDto2);
        }

        public static Page<Member> getPageMembers() {
            Member member1 = new Member();
            Member member2 = new Member();
            List<Member> members = List.of(member1, member2);

            return new PageImpl<>(members, PageRequest.of(0, 10,
                    Sort.by("memberId").descending()), members.size());
        }
    }

    public static class MockFollow {

        public static Follow getFollow() {
            // 현재 LoginUser Id가 1L이므로 2L을 사용.
            // getLoginUser()로 변경 후 수정 필요.
            return Follow.builder()
                    .followId(2L)
                    .follower(MockMember.getMember())
                    .followee(MockMember.getSecondMember())
                    .build();
        }

        public static List<Follow> getFollowList() {
            Follow follow1 = Follow.builder()
                    .followId(2L)
                    .follower(MockMember.getMember())
                    .followee(MockMember.getSecondMember())
                    .build();

            Follow follow2 = Follow.builder()
                    .followId(3L)
                    .follower(MockMember.getSecondMember())
                    .followee(MockMember.getMember())
                    .build();

            return List.of(follow1, follow2);
        }

        public static List<FollowResponseDto> getFollowResponseDtos() {
            FollowResponseDto followResponseDto1 = FollowResponseDto.builder()
                    .memberId(MockMember.getMember().getMemberId())
                    .nickname(MockMember.getMember().getNickname())
                    .dogName(MockMember.getMember().getDogName())
                    .profileUrl(MockMember.getMember().getProfileUrl())
                    .build();

            FollowResponseDto followResponseDto2 = FollowResponseDto.builder()
                    .memberId(MockMember.getSecondMember().getMemberId())
                    .nickname(MockMember.getSecondMember().getNickname())
                    .dogName(MockMember.getSecondMember().getDogName())
                    .profileUrl(MockMember.getSecondMember().getProfileUrl())
                    .build();

            return List.of(followResponseDto1, followResponseDto2);
        }
    }
}
