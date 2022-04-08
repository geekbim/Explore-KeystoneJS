import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './schema';
import { insertSeedData } from './seed-data';

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
})

const session = statelessSessions({
  secret: "-- EXAMPLE COOKIE SECRET; CHANGE ME --",
})

export default withAuth(
  config({
      db: {
          provider: "postgresql",
          url: process.env.DATABASE_URL,
          async onConnect(context) {
              if (process.argv.includes("--seed-data")) {
                  await insertSeedData(context)
              }
          },
      },
      lists,
      session,
  })
)