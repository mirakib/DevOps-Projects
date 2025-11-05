#!/bin/bash
set -eu

if [ -z "${MONGO_INITDB_ROOT_USERNAME:-}" ] || [ -z "${MONGO_INITDB_ROOT_PASSWORD:-}" ]; then
  echo "MONGO_INITDB_ROOT_USERNAME or MONGO_INITDB_ROOT_PASSWORD is not set, skipping init script"
  exit 0
fi

# Use mongosh if available, fall back to mongo
if command -v mongosh >/dev/null 2>&1; then
  MONGO_CLI="mongosh"
else
  MONGO_CLI="mongo"
fi

# Create the admin user in the admin database
${MONGO_CLI} --quiet <<EOF
use admin
db.createUser({ user: "${MONGO_INITDB_ROOT_USERNAME}", pwd: "${MONGO_INITDB_ROOT_PASSWORD}", roles: [ { role: "root", db: "admin" } ] })
EOF

echo "mongo init script finished"
