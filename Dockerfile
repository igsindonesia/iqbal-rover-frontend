FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile --production=false

# stage build
FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock* ./
COPY . .

ARG VITE_MODE=production
RUN yarn build --mode ${VITE_MODE}


# stage production
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]


# DEVELOPMENT RUNTIME (Vite HMR)
FROM node:20-alpine AS development

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock* ./
COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--mode", "dev", "--host", "0.0.0.0"]