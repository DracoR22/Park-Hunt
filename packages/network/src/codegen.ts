import type { CodegenConfig } from '@graphql-codegen/cli'
const inputDocumentsPattern = '**/*.graphql'

const plugins = ['typescript', 'typescript-operations', 'named-operations-object', 'typed-document-node']

const config: CodegenConfig = {
  watch: true,
  overwrite: true,
  schema: '../../apps/api/src/schema.gql',
  generates: {
    './src/gql/generated.ts': {
      documents: `./src/${inputDocumentsPattern}`,
      plugins,
    },
  },
}

export default config
