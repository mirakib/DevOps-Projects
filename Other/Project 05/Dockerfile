FROM node:18-bullseye 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npx", "react-native", "start"]
