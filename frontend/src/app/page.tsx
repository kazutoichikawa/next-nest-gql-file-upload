'use client';
import UploadFileForm from '@/components/UploadFileForm';
import { Container } from '@mui/material';


export default function Home() {
  return (
    <Container>
      <h1 className="text-3xl">
        ファイルのアップロードをテストしてください
      </h1>
      <UploadFileForm />
    </Container>
  );
}
