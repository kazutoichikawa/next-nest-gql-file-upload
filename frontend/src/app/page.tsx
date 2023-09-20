'use client';
import UploadFileForm from '@/components/UploadFileForm';
import { gql, useLazyQuery } from '@apollo/client';
import { Button, Container } from '@mui/material';

const TEST = gql`
query Query {
  test
}
`

export default function Home() {

  const [test] = useLazyQuery(TEST, {
    onCompleted: (res) => {
      console.log('res', res)
    }
  })

  /**
   * GQLの疎通確認
  */
  const handleClickTestGQL = () => {
    test()
  }

  return (
    <Container>
      <h1 className="text-3xl">
        ファイルのアップロードをテストしてください
      </h1>
      <UploadFileForm />

      <h2>graphqlのテスト</h2>
      <Button onClick={handleClickTestGQL}>テスト</Button>
    </Container>
  );
}
