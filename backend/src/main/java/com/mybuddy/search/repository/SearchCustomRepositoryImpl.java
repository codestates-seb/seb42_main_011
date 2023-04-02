package com.mybuddy.search.repository;

import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.QMember;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@RequiredArgsConstructor
public class SearchCustomRepositoryImpl implements SearchCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Member> findByNicknameExceptAdmin(String keyword, PageRequest pageRequest) {
        QMember member = QMember.member;

        QueryResults<Member> queryResults = queryFactory
                .selectFrom(member)
                .where(member.nickname.containsIgnoreCase(keyword)
                        .and(member.memberId.ne(1L)))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(member.memberId.desc())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }

    @Override
    public Page<Member> findByDogNameExceptAdmin(String keyword, PageRequest pageRequest) {
        QMember member = QMember.member;

        QueryResults<Member> queryResults = queryFactory
                .selectFrom(member)
                .where(member.dogName.containsIgnoreCase(keyword)
                        .and(member.memberId.ne(1L)))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(member.memberId.desc())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }


}
