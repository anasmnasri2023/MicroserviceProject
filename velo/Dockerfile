FROM openjdk:8
EXPOSE 8086
ADD target/velo-service-1.0.jar spring-boot-docker.jar
ENTRYPOINT ["java","-jar","/spring-boot-docker.jar"]
