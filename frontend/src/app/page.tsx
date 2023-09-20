'use client';
import UploadFileForm from '@/components/UploadFileForm';
import { Button, Container } from '@mui/material';


export default function Home() {
  const handleClickTestGQL = () => {

  }

  return (
    <Container>
      <h1 className="text-3xl">
        ファイルのアップロードをテストしてください
      </h1>
      <UploadFileForm />

      <h2>graphqlのテスト</h2>
      <Button>テスト</Button>
    </Container>
  );
}
