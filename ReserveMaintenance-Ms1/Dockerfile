FROM node:alpine
WORKDIR    /usr/src/app1
COPY package.json package-lock.json ./
RUN npm install --no-optional
COPY . .
EXPOSE 3000
CMD ["npm", "start"]