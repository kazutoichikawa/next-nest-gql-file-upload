# next-nest-gql-file-upload
graphql-upload@16では
ESmoduleのimportエラーが出るため@14を使う

GraphQL Code Generatorを使う場合はscalar Uploadに対応する
前段のschema.graphgalでscalar Uploadとして定義したものをFile型で扱うように定義しておきます
---------------------------------------------
codegen.yaml
overwrite: true
schema: "../backend/schema.graphql"
documents:
  - ./graphql/queries/*.graphql
  - ./graphql/mutations/*.graphql
generates:
  graphql/generated.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
    config:
      scalars:
       Upload: File
---------------------------------------------
