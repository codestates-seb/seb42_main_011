package com.mybuddy.global.advice;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerformanceAdvice {
    private static final Logger logger = LoggerFactory.getLogger(PerformanceAdvice.class);
    @Around("execution(* com.mybuddy..controller..*.*(..))")
    public Object measureControllerExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();
        long elapsedTime = endTime - startTime;
        logger.info(joinPoint.getSignature() + " executed in " + elapsedTime + "ms ---------");
        return result;
    }
}