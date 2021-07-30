// mock notion client

export const supplierData = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: '6d3c5982-b78e-40e8-bcae-cc87c6f61d34',
      created_time: '2021-06-01T02:43:47.983Z',
      last_edited_time: '2021-06-01T02:43:47.983Z',
      parent: {
        type: 'database_id',
        database_id: '921ffed6-cba4-433f-9cd0-5343aced02e4',
      },
      archived: false,
      properties: {
        ID: { id: 'TCk^', type: 'rich_text', rich_text: [] },
        'Logo URL': { id: 'x^:Z', type: 'rich_text', rich_text: [] },
        'Display name': { id: 'title', type: 'title', title: [] },
      },
    },
    {
      object: 'page',
      id: 'cdcc6837-5cdf-4960-8dae-7bddd9fcfc40',
      created_time: '2021-06-01T02:43:47.983Z',
      last_edited_time: '2021-06-02T01:50:00.000Z',
      parent: {
        type: 'database_id',
        database_id: '921ffed6-cba4-433f-9cd0-5343aced02e4',
      },
      archived: false,
      properties: {
        ID: {
          id: 'TCk^',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '66fb201b-ba2f-4595-afd4-14dcdff13817',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '66fb201b-ba2f-4595-afd4-14dcdff13817',
              href: null,
            },
          ],
        },
        'Logo URL': { id: 'x^:Z', type: 'rich_text', rich_text: [] },
        'Display name': {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: 'Nike', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'Nike',
              href: null,
            },
          ],
        },
      },
    },
    {
      object: 'page',
      id: '6c521429-f1ba-495f-991a-960716d38f46',
      created_time: '2021-06-01T02:43:47.983Z',
      last_edited_time: '2021-06-02T01:52:00.000Z',
      parent: {
        type: 'database_id',
        database_id: '921ffed6-cba4-433f-9cd0-5343aced02e4',
      },
      archived: false,
      properties: {
        ID: {
          id: 'TCk^',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'd7e55cdb-cf9f-42e4-add4-fa535d4f7443',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'd7e55cdb-cf9f-42e4-add4-fa535d4f7443',
              href: null,
            },
          ],
        },
        'Logo URL': { id: 'x^:Z', type: 'rich_text', rich_text: [] },
        'Display name': {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: 'Trader Joes', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'Trader Joes',
              href: null,
            },
          ],
        },
      },
    },
  ],
  next_cursor: null,
  has_more: false,
}
export const rewardData = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: '72fd7df8-71fb-44a4-b979-40725d65a9ff',
      created_time: '2021-06-01T02:36:53.997Z',
      last_edited_time: '2021-06-02T01:58:00.000Z',
      parent: {
        type: 'database_id',
        database_id: 'd136c04d-7bd1-4f40-a3f4-6e30262b6c64',
      },
      archived: false,
      properties: {
        category: {
          id: 'BwD<',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: { content: 'apparel', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'apparel',
              href: null,
            },
          ],
        },
        ID: {
          id: 'TCk^',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '7361b777-79cf-4446-98ac-b7db34e42e73',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '7361b777-79cf-4446-98ac-b7db34e42e73',
              href: null,
            },
          ],
        },
        unlisted: { id: 'Y;A<', type: 'checkbox', checkbox: false },
        'point cost': { id: 'dFf?', type: 'number', number: 20 },
        //'lat (lattitude)': { id: 'hgD;', type: 'number', number: 34.0137 },
        //'lon (longitude)': { id: 'hnUx', type: 'number', number: -118.49438 },
        'Supplier ID': {
          id: 'qPx]',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '66fb201b-ba2f-4595-afd4-14dcdff13817',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '66fb201b-ba2f-4595-afd4-14dcdff13817',
              href: null,
            },
          ],
        },
        'expiration duration (in days)': {
          id: 'ruYF',
          type: 'number',
          number: 30,
        },
        'Image URL': { id: 'x^:Z', type: 'rich_text', rich_text: [] },
        description: { id: 'yvb=', type: 'rich_text', rich_text: [] },
        'Display name': {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: '20% Off Shoes', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '20% Off Shoes',
              href: null,
            },
          ],
        },
      },
    },
    {
      object: 'page',
      id: 'c4d4d512-4b99-45d1-8626-8d9cc309309c',
      created_time: '2021-06-01T02:36:53.997Z',
      last_edited_time: '2021-06-02T01:58:00.000Z',
      parent: {
        type: 'database_id',
        database_id: 'd136c04d-7bd1-4f40-a3f4-6e30262b6c64',
      },
      archived: false,
      properties: {
        category: {
          id: 'BwD<',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: { content: 'food', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'food',
              href: null,
            },
          ],
        },
        ID: {
          id: 'TCk^',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '41c16f7d-79fd-4a63-b5f6-b71b2b3fb7f9',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '41c16f7d-79fd-4a63-b5f6-b71b2b3fb7f9',
              href: null,
            },
          ],
        },
        unlisted: { id: 'Y;A<', type: 'checkbox', checkbox: false },
        'point cost': { id: 'dFf?', type: 'number', number: 20 },
        //'lat (lattitude)': { id: 'hgD;', type: 'number', number: 34.052307 },
        //'lon (longitude)': { id: 'hnUx', type: 'number', number: -118.25156 },
        'Supplier ID': {
          id: 'qPx]',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'd7e55cdb-cf9f-42e4-add4-fa535d4f7443',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'd7e55cdb-cf9f-42e4-add4-fa535d4f7443',
              href: null,
            },
          ],
        },
        'expiration duration (in days)': {
          id: 'ruYF',
          type: 'number',
          number: 30,
        },
        'Image URL': { id: 'x^:Z', type: 'rich_text', rich_text: [] },
        description: { id: 'yvb=', type: 'rich_text', rich_text: [] },
        'Display name': {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: 'Free Wine Bottle', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'Free Wine Bottle',
              href: null,
            },
          ],
        },
      },
    },
    {
      object: 'page',
      id: 'dc3c2ff5-38f3-4fc3-8945-5c0f6d161b6a',
      created_time: '2021-06-01T02:36:53.997Z',
      last_edited_time: '2021-06-02T01:58:00.000Z',
      parent: {
        type: 'database_id',
        database_id: 'd136c04d-7bd1-4f40-a3f4-6e30262b6c64',
      },
      archived: false,
      properties: {
        category: {
          id: 'BwD<',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: { content: 'apparel', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'apparel',
              href: null,
            },
          ],
        },
        ID: {
          id: 'TCk^',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '062d6131-eba9-46c9-89df-5371c1e579e6',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '062d6131-eba9-46c9-89df-5371c1e579e6',
              href: null,
            },
          ],
        },
        unlisted: { id: 'Y;A<', type: 'checkbox', checkbox: false },
        'point cost': { id: 'dFf?', type: 'number', number: 50 },
        'Supplier ID': {
          id: 'qPx]',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '66fb201b-ba2f-4595-afd4-14dcdff13817',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '66fb201b-ba2f-4595-afd4-14dcdff13817',
              href: null,
            },
          ],
        },
        'expiration duration (in days)': {
          id: 'ruYF',
          type: 'number',
          number: 30,
        },
        'Image URL': { id: 'x^:Z', type: 'rich_text', rich_text: [] },
        description: { id: 'yvb=', type: 'rich_text', rich_text: [] },
        'Display name': {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: '50% Off Jackets', link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '50% Off Jackets',
              href: null,
            },
          ],
        },
      },
    },
  ],
  next_cursor: null,
  has_more: false,
}

export const achievementRewardData = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: '0d7d05be-86e8-40f9-8e73-2e353e8294c5',
      created_time: '2021-06-07T18:43:55.893Z',
      last_edited_time: '2021-06-09T18:02:00.000Z',
      parent: {
        type: 'database_id',
        database_id: 'b5b7cc27-971d-4c03-91e0-4e300f5d6728',
      },
      archived: false,
      properties: {
        'Reward ID': {
          id: 'ALbj',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: '7361b777-79cf-4446-98ac-b7db34e42e73',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '7361b777-79cf-4446-98ac-b7db34e42e73',
              href: null,
            },
          ],
        },
        'Achievement ID': {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: '062d6131-eba9-46c9-89df-5371c1e579e6',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: '062d6131-eba9-46c9-89df-5371c1e579e6',
              href: null,
            },
          ],
        },
      },
    },
  ],
  next_cursor: null,
  has_more: false,
}

export function createMockClient() {
  return {
    databases: {
      query: jest.fn(async () => rewardData),
    },
  }
}
