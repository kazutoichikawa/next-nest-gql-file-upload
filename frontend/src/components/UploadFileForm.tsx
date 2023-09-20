import { FC, useCallback } from 'react';
import { FormLabel, Button, Input, FormGroup } from '@mui/material';

const UploadFileForm: FC = () => {
  const handleChangeInput = useCallback((e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // TODO: 複数ファイルに対応
  }, []);

  /**
   * ファイルをアップロードする
   */
  const handleClickUploadFile = useCallback((e: any) => {
    console.log('click');
  }, []);

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
