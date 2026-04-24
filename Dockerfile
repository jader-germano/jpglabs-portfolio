# Stage 1: Build the Vite application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_BASE_PATH=/
ARG VITE_AUTH_BYPASS=false
ENV VITE_BASE_PATH=${VITE_BASE_PATH}
ENV VITE_AUTH_BYPASS=${VITE_AUTH_BYPASS}
RUN npm run build

# Stage 2: Serve the application with Nginx on :3000 (matches k8s portfolio-v2 containerPort)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
