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
  console.log(file);

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    context: {
      headers: {
        'apollo-require-preflight': true,
      },
    },
    onCompleted: (res) => {
      console.log(200, res)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleChangeInput = useCallback((e: any) => {
    setFile(e.target.files[0])

    // TODO: 複数ファイルに対応
  }, []);

  /**
   * ファイルをアップロードする
   */
  const handleClickUploadFile = useCallback((e: any) => {
    console.log('click');
    if (!file) {
      return;
    };

    uploadFile({
      variables: { file: file, createFileInDirectory: true },
    })
  }, [file]);

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
