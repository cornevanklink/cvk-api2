FROM node:18-alpine

WORKDIR /usr/src/app

# Install deps first for better cache
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
