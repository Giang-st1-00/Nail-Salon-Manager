export interface IUser {
  key: string;
  name: string;
  nickName: string;
  age: number;
  email: string;
  address: string;
  gender: "male" | "female";
  createTime: Date;
}
