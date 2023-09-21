FROM node:18 AS builder

# Create app directory
WORKDIR /app

ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /wait-for
RUN chmod +x /wait-for
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install

COPY . .
RUN npx prisma generate

RUN npm run build
RUN npx prisma generate

FROM node:18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma


EXPOSE 3000
# 👇 new migrate and start app s