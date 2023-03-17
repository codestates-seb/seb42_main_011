package com.mybuddy.follow.controller;

import com.google.gson.Gson;
import com.mybuddy.follow.dto.FollowResponseDto;
import com.mybuddy.follow.entity.Follow;
import com.mybuddy.follow.mapper.FollowMapper;
import com.mybuddy.follow.service.FollowService;
import com.mybuddy.global.mockdata.MockTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(FollowController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@WithMockUser(username = "kimcoding@mybuddy.com", roles = {"USER"})
public class FollowControllerTest {

    private final String FOLLOW_DEFAULT_URL = "/api/v1/followers";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FollowService followService;

    @MockBean
    private FollowMapper mapper;

    @Autowired
    private Gson gson;

    @DisplayName("회원 팔로잉")
    @Test
    public void createFollowTest() throws Exception {
        // Given
        String content = gson.toJson(MockTestData.MockFollow.getFollow());
        Follow follow = MockTestData.MockFollow.getFollow();

        given(followService.createFollow(Mockito.anyLong()))
                .willReturn(follow);

        // When
        ResultActions actions =
                mockMvc.perform(
                        post(FOLLOW_DEFAULT_URL)
                                .param("followeeId", "1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(csrf())
                                .content(content)
                );

        // Then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith(FOLLOW_DEFAULT_URL))))
                .andDo(document("create-follow",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("followeeId").description("팔로잉 대상 회원 식별자"),
                                        parameterWithName("_csrf").ignored()
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        ))
                );
    }

    @DisplayName("팔로워 목록 조회")
    @Test
    public void getFollowerListTest() throws Exception {
        // Given
        List<FollowResponseDto> followResponseDtos = MockTestData.MockFollow.getFollowResponseDtos();

        given(followService.getFollowerList(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(MockTestData.MockMember.getPageMembers());
        given(mapper.followersToFollowResponseDtos(Mockito.anyList()))
                .willReturn(followResponseDtos);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");

        // When
        ResultActions actions =
                mockMvc.perform(
                        get(FOLLOW_DEFAULT_URL + "/follower")
                                .params(queryParams)
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                );

        // Then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.*").exists())
                .andExpect(jsonPath("$.data.*", hasSize(2)))
                .andExpect(jsonPath("$.data[0].memberId")
                        .value(followResponseDtos.get(0).getMemberId()))
                .andExpect(jsonPath("$.data[1].memberId")
                        .value(followResponseDtos.get(1).getMemberId()))
                .andExpect(jsonPath("$.data[0].nickname")
                        .value(followResponseDtos.get(0).getNickname()))
                .andExpect(jsonPath("$.data[1].nickname")
                        .value(followResponseDtos.get(1).getNickname()))
                .andExpect(jsonPath("$.data[0].dogName")
                        .value(followResponseDtos.get(0).getDogName()))
                .andExpect(jsonPath("$.data[1].dogName")
                        .value(followResponseDtos.get(1).getDogName()))
                .andExpect(jsonPath("$.data[0].profileUrl")
                        .value(followResponseDtos.get(0).getProfileUrl()))
                .andExpect(jsonPath("$.data[1].profileUrl")
                        .value(followResponseDtos.get(1).getProfileUrl()))
                .andDo(document("get-follower-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("페이지 번호"),
                                        parameterWithName("size").description("페이지 당 회원 수"),
                                        parameterWithName("_csrf").ignored()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("code")
                                                .type(JsonFieldType.STRING)
                                                .description("HTTP Status"),
                                        fieldWithPath("message")
                                                .type(JsonFieldType.STRING)
                                                .description("메시지"),
                                        fieldWithPath("data[]")
                                                .type(JsonFieldType.ARRAY)
                                                .description("팔로워 리스트"),
                                        fieldWithPath("data[].memberId")
                                                .type(JsonFieldType.NUMBER)
                                                .description("팔로워 식별자"),
                                        fieldWithPath("data[].nickname")
                                                .type(JsonFieldType.STRING)
                                                .description("팔로워 닉네임"),
                                        fieldWithPath("data[].dogName")
                                                .type(JsonFieldType.STRING)
                                                .description("강아지 이름"),
                                        fieldWithPath("data[].profileUrl")
                                                .type(JsonFieldType.STRING)
                                                .description("Profile URL 주소"),
                                        fieldWithPath("pageInfo.page")
                                                .type(JsonFieldType.NUMBER)
                                                .description("현재 페이지"),
                                        fieldWithPath("pageInfo.size")
                                                .type(JsonFieldType.NUMBER)
                                                .description("페이지 당 회원 수"),
                                        fieldWithPath("pageInfo.totalElements")
                                                .type(JsonFieldType.NUMBER)
                                                .description("총 회원 수"),
                                        fieldWithPath("pageInfo.totalPages")
                                                .type(JsonFieldType.NUMBER)
                                                .description("총 페이지 수")
                                )
                        )
                ));
    }

    @DisplayName("팔로잉 목록 조회")
    @Test
    public void getFolloweeListTest() throws Exception {
        // Given
        List<FollowResponseDto> followResponseDtos = MockTestData.MockFollow.getFollowResponseDtos();

        given(followService.getFolloweeList(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(MockTestData.MockMember.getPageMembers());
        given(mapper.followeesToFollowResponseDtos(Mockito.anyList()))
                .willReturn(followResponseDtos);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");

        // When
        ResultActions actions =
                mockMvc.perform(
                        get(FOLLOW_DEFAULT_URL + "/followee")
                                .params(queryParams)
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                );

        // Then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.*").exists())
                .andExpect(jsonPath("$.data.*", hasSize(2)))
                .andExpect(jsonPath("$.data[0].memberId")
                        .value(followResponseDtos.get(0).getMemberId()))
                .andExpect(jsonPath("$.data[1].memberId")
                        .value(followResponseDtos.get(1).getMemberId()))
                .andExpect(jsonPath("$.data[0].nickname")
                        .value(followResponseDtos.get(0).getNickname()))
                .andExpect(jsonPath("$.data[1].nickname")
                        .value(followResponseDtos.get(1).getNickname()))
                .andExpect(jsonPath("$.data[0].dogName")
                        .value(followResponseDtos.get(0).getDogName()))
                .andExpect(jsonPath("$.data[1].dogName")
                        .value(followResponseDtos.get(1).getDogName()))
                .andExpect(jsonPath("$.data[0].profileUrl")
                        .value(followResponseDtos.get(0).getProfileUrl()))
                .andExpect(jsonPath("$.data[1].profileUrl")
                        .value(followResponseDtos.get(1).getProfileUrl()))
                .andDo(document("get-followee-list",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("페이지 번호"),
                                        parameterWithName("size").description("페이지 당 회원 수"),
                                        parameterWithName("_csrf").ignored()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("code")
                                                .type(JsonFieldType.STRING)
                                                .description("HTTP Status"),
                                        fieldWithPath("message")
                                                .type(JsonFieldType.STRING)
                                                .description("메시지"),
                                        fieldWithPath("data[]")
                                                .type(JsonFieldType.ARRAY)
                                                .description("팔로잉 리스트"),
                                        fieldWithPath("data[].memberId")
                                                .type(JsonFieldType.NUMBER)
                                                .description("팔로잉 회원 식별자"),
                                        fieldWithPath("data[].nickname")
                                                .type(JsonFieldType.STRING)
                                                .description("팔로잉 회원 닉네임"),
                                        fieldWithPath("data[].dogName")
                                                .type(JsonFieldType.STRING)
                                                .description("강아지 이름"),
                                        fieldWithPath("data[].profileUrl")
                                                .type(JsonFieldType.STRING)
                                                .description("Profile URL 주소"),
                                        fieldWithPath("pageInfo.page")
                                                .type(JsonFieldType.NUMBER)
                                                .description("현재 페이지"),
                                        fieldWithPath("pageInfo.size")
                                                .type(JsonFieldType.NUMBER)
                                                .description("페이지 당 회원 수"),
                                        fieldWithPath("pageInfo.totalElements")
                                                .type(JsonFieldType.NUMBER)
                                                .description("총 회원 수"),
                                        fieldWithPath("pageInfo.totalPages")
                                                .type(JsonFieldType.NUMBER)
                                                .description("총 페이지 수")
                                )
                        )
                ));
    }

    @DisplayName("회원 팔로잉 취소")
    @Test
    public void deleteFollowTest() throws Exception {
        // Given
        Follow follow = MockTestData.MockFollow.getFollow();

        doNothing().when(followService).deleteFollow(follow.getFollowId());

        // When
        ResultActions actions =
                mockMvc.perform(
                        delete(FOLLOW_DEFAULT_URL)
                                .param("followeeId", "1")
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                );

        // Then
        actions
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.data").doesNotExist())
                .andDo(document("delete-follow",
                        preprocessRequest(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("followeeId").description("팔로잉 대상 회원 식별자"),
                                        parameterWithName("_csrf").ignored()
                                )
                        ))
                );
    }
}
