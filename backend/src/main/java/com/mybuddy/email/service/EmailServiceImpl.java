package com.mybuddy.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;
    @Override
    public void sendEmailForPasswordReset(String toEmail, String resetLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);

        String html = setEmailHtml(resetLink); //프론트 링크와 토큰
        helper.setSubject("[마이버디] 비밀번호 재설정 링크를 보내드립니다.");
        helper.setText(html,true);
        mailSender.send(message);
    }

    private String setEmailHtml(String resetLink) {
        return "<html><head><style>" +
                "body { font-family: Arial, sans-serif; font-size: 14px; }" +
                "a,a:visited { text-decoration: none; color: #00AE68;}" +
                "a.button { display: block; position: relative; float: left; width: 120px; padding: 0; margin: 10px 10px 10px 0; font-weight: 600; text-align: center; line-height: 50px; color: #FFF; border-radius: 5px; transition: all 0.2s; }" +
                ".passwordReset { background: #323F4F; }" +
                ".passwordReset.btnPush { box-shadow: 0px 5px 0px 0px #F4B870; }" +
                ".btnPush:hover { margin-top: 15px; margin-bottom: 5px; }" +
                ".passwordReset.btnPush:hover { box-shadow: 0px 0px 0px 0px #F4B870; }" +
                ".clear { clear: both; }" +
                "</style></head><body>" +
                "<p>비밀번호 재설정 버튼을 클릭해 새로운 비밀번호를 설정할 수 있습니다. </p>" +
                "<div class=\"container\">" +
                "<a href=\"" + resetLink + "\" title=\"Button fade blue/green\" class=\"button btnPush passwordReset\">비밀번호 재설정</a>" +
                "<div class=\"clear\"></div>" +
                "</div></body></html>";
    }
}