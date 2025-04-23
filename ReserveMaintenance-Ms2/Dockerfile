FROM node:alpine
WORKDIR    /usr/src/app1
COPY package.json package-lock.json ./
RUN npm install --no-optional
COPY . .
EXPOSE 3001
CMD ["npm", "start"]