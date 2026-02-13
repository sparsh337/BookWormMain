package com.example.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class BookSearchAspect {

    private static final Logger logger = LoggerFactory.getLogger(BookSearchAspect.class);

    @Before("execution(* com.example.controller.BookSearchController.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Enter: {}() with argument[s] = {}", joinPoint.getSignature().getName(),
                Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "execution(* com.example.controller.BookSearchController.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        logger.info("Exit: {}() with result = {}", joinPoint.getSignature().getName(), result);
    }
}
