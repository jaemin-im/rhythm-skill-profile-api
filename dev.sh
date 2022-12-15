#!bin/bash
yarn prisma db pull && yarn prisma generate
yarn start:dev