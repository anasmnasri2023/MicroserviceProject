package com.example.RentaBike_Event_Comment_MS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
@EnableEurekaClient
public class RentaBikeEventCommentMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentaBikeEventCommentMsApplication.class, args);
	}

}
