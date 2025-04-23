FROM openjdk:8-jdk
EXPOSE 8098
ADD target/reservevelo-micro-user-1.0.jar user.jar
ENTRYPOINT ["java","-jar","user.jar"]