package com.mybuddy.global.audit;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

/**
 * <p>@    EntityListeners(class_name.claa) : 설정된 도메인의 값이 변경됐 때를 체크한다.</p>
 * <p>@    EntityListeners(AuditingEntityListener.class) : 값이 변경됐을 시 자동으로 기록한다.</p>
 *
 *
 * <p>@ MappedSuperclass</p>
 * <p>@ CreatedDate : Entity 생성 저장 시간 자동 저장</p>
 * <p>@ createBy : Entity 생성자 저장</p>
 * <p>@ LasModifiedDate : Entity 값 변경시 시간 자동 저장</p>
 * */

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {
    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "MODIFIED_AT", updatable = false)
    private LocalDateTime modifiedAt;

//
//    @CreatedBy //AuditorAware 필요
//    @Column(updatable = false)
//    private String createId;
}