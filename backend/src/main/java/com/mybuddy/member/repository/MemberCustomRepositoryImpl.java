package com.mybuddy.member.repository;

import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

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
}