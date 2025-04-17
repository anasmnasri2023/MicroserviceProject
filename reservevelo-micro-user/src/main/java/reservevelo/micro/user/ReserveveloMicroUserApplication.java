package reservevelo.micro.user;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import reservevelo.micro.user.models.User;
import reservevelo.micro.user.repos.UserRepo;
import reservevelo.micro.user.services.UserService;

@SpringBootApplication
@EnableDiscoveryClient
@EnableEurekaClient
public class ReserveveloMicroUserApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReserveveloMicroUserApplication.class, args);
	}


}
