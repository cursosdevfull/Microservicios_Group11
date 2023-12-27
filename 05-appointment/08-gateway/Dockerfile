ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine as stage_base
WORKDIR /app

FROM stage_base as stage_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM stage_base as stage_build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM stage_base as stage_final
RUN apk add curl
COPY --from=stage_deps /app/node_modules ./node_modules
COPY --from=stage_build /app/dist ./dist
COPY package.json .
USER node
CMD npm run start:prod