import { FC, useState, useCallback } from 'react';
import { FormLabel, Button, Input, FormGroup } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const UPLOAD_FILE = gql`
mutation UploadImage($file: Upload!, $createFileInDirectory: Boolean!) {
  uploadImage(file: $file, createFileInDirectory: $createFileInDirectory)
}
`

const UploadFileForm: FC = () => {
  const [file, setFile] = useState<File>();
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    context: {
      headers: {
        'apollo-require-preflight': true,
      },
    },
  })

  const handleChangeInput = useCallback((e: any) => {
    setFile(e.target.files[0])
  }, []);

  /**
   * ファイルをアップロードする
   */
  const handleClickUploadFile = useCallback(() => {
    if (!file) {
      return;
    };

    uploadFile({
      variables: { file: file, createFileInDirectory: true },
    })
  }, [file, uploadFile]);

  return (
    <div className='text-center'>
      <FormGroup className='my-2.5'>
        <FormLabel htmlFor='input-file'>
          <Input id='input-file' type='file' style={{color: 'white'}} onChange={handleChangeInput} />
        </FormLabel>
      </FormGroup>

      <Button
        className='w-2/4'
        variant='contained'
        color='primary'
        onClick={handleClickUploadFile}
      >
        アップロード
      </Button>
    </div>
  );
};

export default UploadFileForm;
