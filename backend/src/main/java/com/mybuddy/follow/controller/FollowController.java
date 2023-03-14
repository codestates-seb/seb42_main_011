package com.mybuddy.follow.controller;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.follow.mapper.FollowMapper;
import com.mybuddy.follow.service.FollowService;
import com.mybuddy.global.utils.ApiMultiResponse;
import com.mybuddy.global.utils.ApiSingleResponse;
import com.mybuddy.global.utils.UriMaker;
import com.mybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/followers")
@RequiredArgsConstructor
@Validated
@CrossOrigin
public class FollowController {

    private final String FOLLOW_DEFAULT_URL = "/api/v1/followers";

    private final FollowService followService;

    private final FollowMapper mapper;

    @PostMapping // @Positive는 @Min(2)로 변경될 예정.
    public ResponseEntity<ApiSingleResponse> createFollow(@Positive @RequestParam Long followeeId) {
        Follow follow = followService.createFollow(followeeId);

        URI uriLocation = UriMaker.getUri(FOLLOW_DEFAULT_URL, follow.getFollowId());

        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.CREATED, "'좋아요'가 생성되었습니다.");

        return ResponseEntity.created(uriLocation).body(response);
    }

    @GetMapping("/follower")
    public ResponseEntity<ApiSingleResponse> getFollowerList(@Positive @RequestParam int page,
                                                             @Positive @RequestParam int size) {
        Page<Member> pageFollowers = followService.getFollowerList(page - 1, size);
        List<Member> obtainedFollowers = pageFollowers.getContent();
        return new ResponseEntity(new ApiMultiResponse<>(HttpStatus.OK, "전체 팔로워 정보입니다.",
                mapper.followersToFollowResponseDtos(obtainedFollowers), pageFollowers), HttpStatus.OK);
    }

    @GetMapping("/followee")
    public ResponseEntity<ApiSingleResponse> getFolloweeList(@Positive @RequestParam int page,
                                                             @Positive @RequestParam int size) {
        Page<Member> pageFollowees = followService.getFolloweeList(page - 1, size);
        List<Member> obtainedFollowees = pageFollowees.getContent();
        return new ResponseEntity(new ApiMultiResponse<>(HttpStatus.OK, "전체 팔로잉 정보입니다.",
                mapper.followeesToFollowResponseDtos(obtainedFollowees), pageFollowees), HttpStatus.OK);
    }

    @DeleteMapping // @Positive는 @Min(2)로 변경될 예정.
    public ResponseEntity<ApiSingleResponse> deleteFollow(@Positive @RequestParam Long followeeId) {
        followService.deleteFollow(followeeId);

        return ResponseEntity.noContent().build();
    }
}
