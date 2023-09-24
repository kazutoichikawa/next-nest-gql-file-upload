import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { join } from 'path';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async test(): Promise<string> {
    return 'SUCCESS';
  }

  @Mutation(() => String, { name: 'uploadImage' })
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
    @Args({ name: 'createFileInDirectory', type: () => Boolean })
    createFileInDirectory: boolean
  ) {
    console.log('UPLOAD IMAGE CALLED', {
      file,
      createFileInDirectory,
    });

    return new Promise((resolve, reject) => {
      if (createFileInDirectory) {
        const dirPath = join(__dirname, '/uploads');
        if (!existsSync(dirPath)) {
          mkdirSync(dirPath, { recursive: true });
        }

        file
          .createReadStream()
          .pipe(createWriteStream(`${dirPath}/${file.filename}`))
          .on('finish', () => {
            console.log('IMAGE CREATED IN DIRECTORY');
            resolve(true);
          })
          .on('error', (error) => {
            console.log('IMAGE UPLOAD ERROR', error);
            reject(false);
          });
      } else {
        file
          .createReadStream()
          .on('data', (data) => {
            console.log('DATE FROM STREAM', data);
          })
          .on('end', () => {
            console.log('END OF STREAM');
            resolve(true);
          })
          .on('error', (error) => {
            console.log('IMAGE UPLOAD ERROR', error);
            reject(false);
          });
      }
    });
  }
}
