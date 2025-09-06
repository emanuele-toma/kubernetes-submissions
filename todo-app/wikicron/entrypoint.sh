#!/bin/sh
bun prisma generate
bun prisma migrate deploy
exec "$@"