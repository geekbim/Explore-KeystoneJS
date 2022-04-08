import { config, list } from '@keystone-6/core';
import { password, integer, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { withAuth, session } from './auth';

export const lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
      postsAuthorNew: relationship({ ref: 'Post.authorNew', many: true }),
      password: password({ validation: { isRequired: true } }),  
    },
  }),
  Post: list({
    fields: {
      title: text({ validation: { isRequired: true } }),
      totalPages: integer(),
      publishedAt: timestamp(),
      author: relationship({ ref: 'User.posts' }),
      authorNew: relationship({ 
        ref: 'User.postsAuthorNew',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      status: select({
        options: [
          { label: 'Pubished', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
      }),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      }),
    },
  }),
}