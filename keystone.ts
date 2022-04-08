import { config, list } from '@keystone-6/core';
import { integer, relationship, text } from '@keystone-6/core/fields';

const lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
      postsAuthorNew: relationship({ ref: 'Post.authorNew', many: true }),
    },
  }),
  Post: list({
    fields: {
      title: text({ validation: { isRequired: true } }),
      totalPages: integer(),
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
    },
  }),
}

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  },
  lists,
});