package com.neu.tasksphere.service;

import feign.Response;
import org.springframework.stereotype.Service;

import com.mailgun.api.v3.MailgunMessagesApi;
import com.mailgun.client.MailgunClient;
import com.mailgun.model.message.Message;
import com.mailgun.model.message.MessageResponse;
import org.springframework.beans.factory.annotation.Value;

import static com.mailgun.util.Constants.DEFAULT_BASE_URL_US_REGION;

@Service
public class EmailService {

    private final MailgunMessagesApi mailgunMessagesApi;
    private final String domain;

    public EmailService(@Value("${mailgun.api-key}") String apiKey,
                        @Value("${mailgun.domain}") String domain) {
        this.mailgunMessagesApi = MailgunClient.config(apiKey).createApi(MailgunMessagesApi.class);
        this.domain = domain;
    }

    public void sendEmail(String recipient, String subject, String message) {
        Message mailMessage = Message.builder()
                .from("noreply@" + domain)
                .to(recipient)
                .subject(subject)
                .text(message)
                .build();
        try {
            Response response = mailgunMessagesApi.sendMessageFeignResponse(domain, mailMessage);
            int statusCode = response.status();
            if (statusCode != 200) {
                throw new RuntimeException("Failed to send email to " + recipient);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email to " + recipient);
        }
    }
}

