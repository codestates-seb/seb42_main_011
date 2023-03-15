package com.mybuddy.global.mockdata;

import com.mybuddy.comment.entity.Comment;
import com.mybuddy.member.dto.*;
import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

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

    public static class MockMember {

        public static Member getMember() {
            return Member.builder()
                    .memberId(1L)
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

        public static MemberCreateDto getMemberCreateDto() {
            return MemberCreateDto.builder()
                    .email("kimcoding@mybuddy.com")
                    .password("asdf1234")
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .dogGender(Member.DogGender.MALE)
                    .build();
        }

        public static MemberPatchDto getMemberPatchDto() {
            return MemberPatchDto.builder()
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .address("서울시 강북구")
                    .aboutMe("왕밤톨입니다.")
                    .build();
        }

        public static List<MyBulletinPostDto> getMyBulletinPostDtos() {
            MyBulletinPostDto bulletinPostDto1 = MyBulletinPostDto.builder()
                    .bulletinPostId(1L)
                    .photoUrl("www.mybuddy.com/another-bamtol1.png")
                    .build();

            MyBulletinPostDto bulletinPostDto2 = MyBulletinPostDto.builder()
                    .bulletinPostId(2L)
                    .photoUrl("www.mybuddy.com/another-bamtol2.png")
                    .build();

            return List.of(bulletinPostDto1, bulletinPostDto2);
        }

        public static List<MyAmenityDto> getMyAmenityDtos() {
            MyAmenityDto amenityDto1 = MyAmenityDto.builder()
                    .amenityId(1L)
                    .amenityName("애견카페1")
                    .address("서울시 강북구 xx")
                    .photoUrl("www.dog-cafe1.com/map.png")
                    .build();

            MyAmenityDto amenityDto2 = MyAmenityDto.builder()
                    .amenityId(2L)
                    .amenityName("애견카페2")
                    .address("서울시 강북구 xx")
                    .photoUrl("www.dog-cafe2.com/map.png")
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
                    .myBulletinPostDtos(getMyBulletinPostDtos())
                    .myAmenityDtos(getMyAmenityDtos())
                    .build();
        }

        public static List<MemberListResponseDto> getMemberListResponseDtos() {
            MemberListResponseDto listResponseDto1 = MemberListResponseDto.builder()
                    .nickname("김코딩")
                    .dogName("왕밤톨")
                    .followerNumber(0L)
                    .followeeNumber(0L)
                    .profileUrl("www.mybuddy.com/bamtol-the-king.png")
                    .build();

            MemberListResponseDto listResponseDto2 = MemberListResponseDto.builder()
                    .nickname("홍길동")
                    .dogName("뭉치")
                    .followerNumber(0L)
                    .followeeNumber(0L)
                    .profileUrl("www.mybuddy.com/ordinary-dog.png")
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
}
