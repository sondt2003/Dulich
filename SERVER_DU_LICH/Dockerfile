FROM node:18.14.2 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate
# RUN npx prisma migrate dev --name init
FROM node:18.14.2

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/wait-for-it.sh ./
COPY --from=builder /app/docker-entrypoint.sh ./

RUN chmod +x ./wait-for-it.sh ./docker-entrypoint.sh


EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"]

# docker build -t dulich_server .
# docker run -dp 3000:3000 dulich_server