package com.mybuddy.comment.controller;

import com.google.gson.Gson;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.comment.dto.CommentCreateDto;
import com.mybuddy.comment.dto.CommentResponseDto;
import com.mybuddy.comment.dto.CommentUpdateDto;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.comment.mapper.CommentMapper;
import com.mybuddy.comment.service.CommentService;
import com.mybuddy.global.mockdata.MockTestData;
import com.mybuddy.member.entity.Member;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.security.core.parameters.P;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;

import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CommentController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class CommentControllerTest {

    private static final String COMMENT_DEFAULT_URL = "/api/v1/comments";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @MockBean
    private CommentMapper commentMapper;

    @Autowired
    private Gson gson;

    private static Member member;
    private static BulletinPost bulletinPost;
    @BeforeAll
    static void init() {
        member = MockTestData.MockMember.getMember();

        bulletinPost = new BulletinPost(
                1L, member, null,
                "url","게시글입니다.", new ArrayList<>()
        );
    }

    @DisplayName("댓글 작성")
    @Test
    public void createComment() throws Exception {

        //given
        Comment comment =  MockTestData.MockComment.getComment();

        Long bulletinPostId = 1L;
        CommentCreateDto createDto = CommentCreateDto.builder()
                .bulletinPostId(bulletinPostId)
                .commentContent(comment.getCommentContent())
                .build();
        String content = gson.toJson(createDto);

        CommentResponseDto responseDto = CommentResponseDto.builder()
                .commentContent(comment.getCommentContent())
                .memberId(member.getMemberId())
                .nickName(member.getNickname())
                .dogName(member.getDogName()).build();

        given(commentMapper.commentCreateDtoToComment(Mockito.any(CommentCreateDto.class))).willReturn(new Comment());
        given(commentService.createComment(Mockito.any(Long.class), Mockito.any(Comment.class))).willReturn(comment);
        given(commentMapper.commentToCommentResponseDto(comment)).willReturn(responseDto);

        //when
        ResultActions resultActions = mockMvc.perform(
                RestDocumentationRequestBuilders.post(COMMENT_DEFAULT_URL)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        resultActions.andExpect(status().isCreated())
//                .andExpect(header().string("Location", is(startsWith(COMMENT_DEFAULT_URL))))
                .andExpect(jsonPath("$.code",is("201")))
                .andExpect(jsonPath("$.message",is("댓글이 생성되었습니다")))
                .andExpect(jsonPath("$.data.commentContent",is(comment.getCommentContent())))
                .andExpect(jsonPath("$.data.memberId").value(member.getMemberId()))
                .andExpect(jsonPath("$.data.nickName",is(member.getNickname())))
                .andExpect(jsonPath("$.data.dogName",is(member.getDogName())));

    }

    @DisplayName("댓글 수정")
    @Test
    public void updateComment() throws Exception {

        //given
        Long commentId = 1L;
        String updateContent = "수정할 댓글 내용입니다.";

        CommentUpdateDto updateDto = CommentUpdateDto.builder()
                .commentContent(updateContent)
                .build();

        String content = gson.toJson(updateDto);

        Comment originalComment =  MockTestData.MockComment.getComment();

        CommentResponseDto responseDto = CommentResponseDto.builder()
                .commentContent(updateContent)
                .memberId(member.getMemberId())
                .nickName(member.getNickname())
                .dogName(member.getDogName()).build();

        given(commentMapper.commentUpdateDtoToComment(Mockito.any(CommentUpdateDto.class))).willReturn(new Comment());
        given(commentService.updateComment(Mockito.any(Comment.class))).willReturn(new Comment());
        given(commentMapper.commentToCommentResponseDto(Mockito.any(Comment.class))).willReturn(responseDto);

        //when
        ResultActions resultActions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch(COMMENT_DEFAULT_URL+"/{comment-id}", commentId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.code",is("200")))
                .andExpect(jsonPath("$.message",is("댓글이 수정되었습니다")))
                .andExpect(jsonPath("$.data.commentContent",is(updateContent)))
                .andExpect(jsonPath("$.data.memberId").value(member.getMemberId()))  //member.getMemberId()
                .andExpect(jsonPath("$.data.nickName",is(member.getNickname())))
                .andExpect(jsonPath("$.data.dogName",is(member.getDogName())));

    }

    @DisplayName("댓글 삭제")
    @Test
    public void deleteComment() throws Exception {

        //given
        Long commentId = 1L;
        doNothing().when(commentService).deleteComment(commentId);

        //when
        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders
                        .delete(COMMENT_DEFAULT_URL+"/{question-id}", commentId)
        );

        //then
        actions
                .andExpect(status().isNoContent());
    }

}
