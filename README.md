# next-nest-gql-file-upload
graphql-upload@16では
ESmoduleのimportエラーが出るため@14を使う


## フロントエンド
### ライブラリ
 - apollo-upload-client
 - @types/apollo-upload-client

### 実装
 - Apollo Clientを作る際に使うライブラリを変える(apollo-upload-client)
 - リクエストを送る際のヘッダーに'apollo-require-preflight': trueを付与する

### 備考
GraphQL Code Generatorを使う場合はscalar Uploadに対応する
前段のschema.graphgalでscalar Uploadとして定義したものをFile型で扱うように定義しておきます

```
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
```

## バックエンド
### ライブラリ
 - graphql-upload-ts
   - 最新バージョンを使うとインポートエラーが出るため、14を使用して実装している人が多い

### 実装
 - fileの型を定義(backend/src/file.entity.ts)
 - middleware定義(backend/src/main.ts R42)

 ## テスト方法
  - 画像ファイルをアップロード
  - バックエンドサーバーのログにファイル詳細と、成功ログが出たら、backend/dist/uploads/にファイルが生成される

```
Backend Server Log

// ファイル詳細ログ
UPLOAD IMAGE CALLED {
  file: {
    filename: 'persaCremind.png',
    mimetype: 'image/png',
    encoding: '7bit',
    createReadStream: [Function: createReadStream]
  },
  createFileInDirectory: true
}

IMAGE CREATED IN DIRECTORY // アップロード成功ログ
```

