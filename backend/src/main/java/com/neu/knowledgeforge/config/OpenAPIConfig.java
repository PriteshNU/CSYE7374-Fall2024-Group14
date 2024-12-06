package com.neu.knowledgeforge.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "KnowledgeForge",
                        url = "https://knowledgeforge.com"
                ),
                title = "OpenAPI specification - KnowledgeForge",
                version = "1.0"
        )
//        security = {
//                @SecurityRequirement(
//                        name = "bearerAuth"
//                )
//        }
)
//@SecurityScheme(
//        name = "bearerAuth",
//        description = "JWT auth description",
//        scheme = "bearer",
//        type = SecuritySchemeType.HTTP,
//        bearerFormat = "JWT",
//        in = SecuritySchemeIn.HEADER
//)
public class OpenAPIConfig {
}
