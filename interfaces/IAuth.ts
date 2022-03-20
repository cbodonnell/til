export interface IAuth {
  username: string;
  uuid: string;
  groups: IGroup[];
}

export interface IGroup {
  id: number;
  name: string;
}