const { Client } = require('@notionhq/client')

let client

export function getClient() {
  if (!client) {
    client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
  }
  return client
}
