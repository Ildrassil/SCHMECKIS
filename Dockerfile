FROM openjdk:21

EXPOSE 8080

ADD backend/target/backendNameVonDerJarImTargetOrdner.jar backend.jar

CMD [ "sh", "-c", "java -jar /backend.jar" ]
