package com.mybuddy.search.service;

import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.member.entity.Member;
import com.mybuddy.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;
    public Page<Member> findByNameType(String type, int page, int size, String keyword) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "memberId"));

        if (type.equals("nickname")) {
            return searchRepository.findByNicknameExceptAdmin(keyword, pageRequest);
        }
        else if (type.equals("dogName")) {
            return searchRepository.findByDogNameExceptAdmin(keyword, pageRequest);
        }
        else throw new LogicException(LogicExceptionCode.TYPE_NOT_FOUND);

    }
}
