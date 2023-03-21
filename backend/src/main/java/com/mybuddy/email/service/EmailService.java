package com.mybuddy.email.service;

import javax.mail.MessagingException;

public interface EmailService {

    void sendEmailForPasswordReset(String email, String url) throws MessagingException;

}
