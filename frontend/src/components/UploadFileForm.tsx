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
    <div style={{textAlign: 'center'}}>
      <FormGroup style={{marginBottom: '10px'}}>
        <FormLabel htmlFor='input-file'>
          <Input id='input-file' type='file' style={{color: 'white'}} onChange={handleChangeInput} />
        </FormLabel>
      </FormGroup>

      <Button style={{width: '500px'}} variant='contained' onClick={handleClickUploadFile}>
        アップロード
      </Button>
    </div>
  );
};

export default UploadFileForm;
