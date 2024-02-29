FROM --platform=linux/amd64 openjdk:21

EXPOSE 8080

ADD backend/target/backend-0.0.1-SNAPSHOT.jar schmeckis.jar

CMD [ "sh", "-c", "java -jar /schmeckis.jar" ]
