package reservevelo.micro.balade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
//@EnableFeignClients
public class ReserveveloMicroBaladeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReserveveloMicroBaladeApplication.class, args);
	}

}
