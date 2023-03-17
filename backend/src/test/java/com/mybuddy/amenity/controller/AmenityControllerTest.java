package com.mybuddy.amenity.controller;
import com.google.gson.Gson;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.service.AmenityService;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.mapper.BulletinPostMapper;
import com.mybuddy.global.mockdata.MockTestData;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AmenityController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@WithMockUser(username = "kimcoding@mybuddy.com", roles = {"USER"})
public class AmenityControllerTest {
    private static final String AMENITY_DEFAULT_URL = "/api/v1/amenities";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AmenityService amenityService;

    @MockBean
    private AmenityMapper amenityMapper;

    @MockBean
    private BulletinPostMapper bulletinPostMapper;

    @Autowired
    private Gson gson;

    @DisplayName("장소 정보 얻기")
    @Test
    public void getAmenityTest() throws Exception {
        //given
        Long amenityId = 1L;
        Amenity amenity = MockTestData.MockAmenity.getAmenity();
        AmenityResponseDto amenityResponse = MockTestData.MockAmenity.getAmenityResponseDto();

        given(amenityService.getAmenityInfo(Mockito.anyLong())).willReturn(amenity);
        given(amenityMapper.amenityToAmenityResponseDto(Mockito.any(Amenity.class))).willReturn(amenityResponse);

        //when
        ResultActions resultActions = mockMvc.perform(
                RestDocumentationRequestBuilders.get(AMENITY_DEFAULT_URL+"/{amenity-id}",amenityId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.code",is("200")))
                .andExpect(jsonPath("$.message",is("장소 정보 반환")))
                .andExpect(jsonPath("$.data.amenityId").value(amenity.getAmenityId()))
                .andExpect(jsonPath("$.data.addressId").value(amenity.getAddressId()))
                .andExpect(jsonPath("$.data.amenityName").value(amenity.getAmenityName()))
                .andExpect(jsonPath("$.data.address").value(amenity.getAddress()))
                .andExpect(jsonPath("$.data.longitude").value(amenity.getLongitude()))
                .andExpect(jsonPath("$.data.latitude").value(amenity.getLatitude()))
                .andDo(document(
                        "get-amenity",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                List.of(parameterWithName("amenity-id").description("장소 식별자"))
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("code").type(JsonFieldType.STRING).description("상태 코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("상태 코드 메세지"),
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("장소 정보"),
                                        fieldWithPath("data.amenityId").type(JsonFieldType.NUMBER).description("장소 식별자"),
                                        fieldWithPath("data.addressId").type(JsonFieldType.NUMBER).description("카카오 API 식별자"),
                                        fieldWithPath("data.amenityName").type(JsonFieldType.STRING).description("장소 이름"),
                                        fieldWithPath("data.address").type(JsonFieldType.STRING).description("전체 주소"),
                                        fieldWithPath("data.longitude").type(JsonFieldType.NUMBER).description("경도(x)"),
                                        fieldWithPath("data.latitude").type(JsonFieldType.NUMBER).description("위도(y)"),
                                        fieldWithPath("data.bulletinPostCount").type(JsonFieldType.NUMBER).description("태그된 게시물의 수 (여기에선 출력하지 않습니다)").optional()
                                )
                        )

                ));

    }

    @DisplayName("장소가 태그된 게시물들 얻기")
    @Test
    public void findTaggedBulletinPostByAmenityIdTest() throws Exception {
        //given
        Long amenityId = 1L;

        List<BulletinPostDto.ResponseForFeed> feedList = MockTestData.MockAmenity.getListBulletinPostFeed();


        int page = 1;
        int size = 10;
        int total = 2;

        given(amenityService.findTaggedBulletinPostList(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt()))
                .willReturn(new PageImpl<BulletinPost>(Collections.emptyList(), PageRequest.of(page-1, size), total));
        given(bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(Mockito.any(List.class))).willReturn(feedList);

        //when
        ResultActions resultActions = mockMvc.perform(
                RestDocumentationRequestBuilders.get(AMENITY_DEFAULT_URL+"/{amenity-id}/bulletin-posts",amenityId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .param("page", String.valueOf(page))
                        .param("size", String.valueOf(size))
        );

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.code",is("200")))
                .andExpect(jsonPath("$.message",is("장소가 태그된 게시물들 반환")))
                .andExpect(jsonPath("$.data[0].bulletinPostId").value(feedList.get(0).getBulletinPostId()))
                .andExpect(jsonPath("$.data[0].photoUrl").value(feedList.get(0).getPhotoUrl()))
                .andExpect(jsonPath("$.data[0].postContent").value(feedList.get(0).getPostContent()))
                .andExpect(jsonPath("$.data[0].memberId").value(feedList.get(0).getMemberId()))
                .andExpect(jsonPath("$.data[0].nickname").value(feedList.get(0).getNickname()))
                .andExpect(jsonPath("$.data[0].dogName").value(feedList.get(0).getDogName()))
                .andExpect(jsonPath("$.data[0].commentList").value(feedList.get(0).getCommentList()))
                .andExpect(jsonPath("$.data[0].commentCount").value(feedList.get(0).getCommentCount()))

                .andExpect(jsonPath("$.pageInfo.page").value(page))
                .andExpect(jsonPath("$.pageInfo.size").value(size))
                .andExpect(jsonPath("$.pageInfo.totalElements").value(total))
                .andExpect(jsonPath("$.pageInfo.totalPages").value(total/size+1))

                .andDo(document(
                        "get-tagged-bulletin-post-list",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                List.of(parameterWithName("amenity-id").description("장소 식별자"))
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("code").type(JsonFieldType.STRING).description("상태 코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("상태 코드 메세지"),

                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("장소가 태그된 게시물 리스트"),
                                        fieldWithPath("data[].bulletinPostId").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                        fieldWithPath("data[].photoUrl").type(JsonFieldType.STRING).description("게시물 사진 URL"),
                                        fieldWithPath("data[].postContent").type(JsonFieldType.STRING).description("게시물 내용"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("data[].nickname").type(JsonFieldType.STRING).description("견주 닉네임"),
                                        fieldWithPath("data[].dogName").type(JsonFieldType.STRING).description("강아지 이름"),
                                        fieldWithPath("data[].commentList").type(JsonFieldType.ARRAY).description("댓글 리스트"),
                                        fieldWithPath("data[].commentCount").type(JsonFieldType.NUMBER).description("댓글 수"),

                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지당 게시물 수"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 게시물 개수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                                )
                        )
                ));

    }

    @DisplayName("추천 장소 얻기")
    @Test
    public void getRecommendAmenitiesTest() throws Exception {

        //given
        String state = "서울";
        String region = "광진구";

        List<AmenityResponseDto> recomendList = MockTestData.MockAmenity.getRecommentAmenityList();

        given(amenityService.getRecommendAmenities(Mockito.anyString(),Mockito.anyString())).willReturn(recomendList);

        //when
        ResultActions resultActions = mockMvc.perform(
                RestDocumentationRequestBuilders.get(AMENITY_DEFAULT_URL)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .param("state", String.valueOf(state))
                        .param("region", String.valueOf(region))
        );

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.code",is("200")))
                .andExpect(jsonPath("$.message",is("해당 지역의 추천 장소 리스트")))
                .andExpect(jsonPath("$.data[0].amenityId").value(recomendList.get(0).getAmenityId()))
                .andExpect(jsonPath("$.data[0].addressId").value(recomendList.get(0).getAddressId()))
                .andExpect(jsonPath("$.data[0].amenityName").value(recomendList.get(0).getAmenityName()))
                .andExpect(jsonPath("$.data[0].address").value(recomendList.get(0).getAddress()))
                .andExpect(jsonPath("$.data[0].longitude").value(recomendList.get(0).getLongitude()))
                .andExpect(jsonPath("$.data[0].latitude").value(recomendList.get(0).getLatitude()))
                .andExpect(jsonPath("$.data[0].bulletinPostCount").value(recomendList.get(0).getBulletinPostCount()))

                .andDo(
                        document(
                    "get-recommend-amenity-state-region",

                            preprocessResponse(prettyPrint()),

                            requestParameters(
                                List.of(
                                        parameterWithName("state").description("주소의 첫번째 단어 (ex 서울)"),
                                        parameterWithName("region").description("주소의 두번째 단어 (ex 광진구)"),
                                        parameterWithName("_csrf").ignored()
                                )
                            ),

                            responseFields(
                                 List.of(
                                        fieldWithPath("code").type(JsonFieldType.STRING).description("상태 코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("상태 코드 메세지"),

                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("장소 필터링된 추천 장소 리스트"),
                                        fieldWithPath("data[].amenityId").type(JsonFieldType.NUMBER).description("장소 식별자"),
                                        fieldWithPath("data[].addressId").type(JsonFieldType.NUMBER).description("카카오 API 식별자"),
                                        fieldWithPath("data[].amenityName").type(JsonFieldType.STRING).description("장소 이름"),
                                        fieldWithPath("data[].address").type(JsonFieldType.STRING).description("전체 주소"),
                                        fieldWithPath("data[].longitude").type(JsonFieldType.NUMBER).description("경도(x)"),
                                        fieldWithPath("data[].latitude").type(JsonFieldType.NUMBER).description("위도(y)"),
                                        fieldWithPath("data[].bulletinPostCount").type(JsonFieldType.NUMBER).description("태그된 게시물의 수")
                                 )
                            )
                        )
                );
    }

}