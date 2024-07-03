FROM postgres:16-alpine3.20

COPY ./schema.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_PASSWORD=postgres
