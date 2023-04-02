package com.mybuddy.member.repository;

import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.QMember;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Member> findByEmail(String email) {
        QMember member = new QMember("member1");

        return Optional.ofNullable(
                queryFactory
                        .select(member)
                        .from(member)
                        .where(member.email.eq(email))
                        .fetchOne()
        );
    }

    @Override
    public Optional<Member> findByNickname(String nickname) {
        QMember member = new QMember("member1");

        return Optional.ofNullable(
                queryFactory
                        .select(member)
                        .from(member)
                        .where(member.nickname.eq(nickname))
                        .fetchOne()
        );
    }

    @Override
    public Optional<Member> findByMemberIdAndMemberStatusIs(Long memberId, Member.MemberStatus memberStatus) {
        QMember member = new QMember("member1");

        return Optional.ofNullable(
                queryFactory
                        .select(member)
                        .from(member)
                        .where(member.memberId.eq(memberId)
                                .and(member.memberStatus.eq(memberStatus)))
                        .fetchOne()
        );
    }

    @Override
    public Optional<Member> findByMemberEmailAndMemberStatusIs(String email, Member.MemberStatus memberStatus) {
        QMember member = new QMember("member1");

        return Optional.ofNullable(
                queryFactory
                        .select(member)
                        .from(member)
                        .where(member.email.eq(email)
                                .and(member.memberStatus.eq(memberStatus)))
                        .fetchOne()
        );
    }

    @Override
    public Page<Member> findByMemberStatus(Member.MemberStatus memberStatus, PageRequest pageRequest) {
        QMember member = new QMember("member1");

        QueryResults<Member> queryResults = queryFactory
                .selectFrom(member)
                .where(member.memberStatus.eq(memberStatus)
                        .and(member.memberId.goe(2)))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(member.memberId.desc())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }
}
