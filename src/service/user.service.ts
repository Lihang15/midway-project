import { Provide } from '@midwayjs/decorator';
// import { rejects } from 'assert';
// import { resolve } from 'path';
import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getUserName(name: string) {
    return new Promise(resolve=>{
      setTimeout(() => {
        resolve('hahhahaaaaa')
      }, (3000));
    })
      
  }
}
