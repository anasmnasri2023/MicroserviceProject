FROM openjdk:17
EXPOSE 8093
ADD "target/apigateway-0.0.1-SNAPSHOT.jar" "apigateway.jar"
ENTRYPOINT ["java","-jar","apigateway.jar"]