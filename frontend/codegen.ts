import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema: 'http://localhost:3000/graphql',
  schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  documents: ['src/graphql/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: ['typescript'],
    },
  },
};

export default config;
