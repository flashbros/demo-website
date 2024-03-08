FROM node:18-alpine

RUN apk update && apk add --no-cache docker-cli

# Install Dependencies
WORKDIR /app
COPY package.json package-lock.json*  ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy all the files
WORKDIR /app
COPY . .

# Build the frontend
RUN \
  if [ -f package-lock.json ]; then npm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
EXPOSE 3000
ENV HOSTNAME "0.0.0.0"
CMD ["npm", "run", "start"]