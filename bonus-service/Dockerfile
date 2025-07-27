# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.4

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base
# Set working directory for all build stages.
WORKDIR /app

################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

################################################################################
# Create a stage for building the application.
FROM base AS build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS production

# Use production node environment by default.
ENV NODE_ENV=production

# Run the application as a non-root user.
USER node

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json .
COPY --from=build /app/.env .

# Run the application.
CMD npm run start:prod

################################################################################
FROM base AS development

ENV NODE_ENV=development

COPY package*.json .
COPY . .

# load node_modules if they aren't loaded and start
CMD \[ -d "node_modules" \] && npm run start:dev || \
    npm ci && npm run start:dev