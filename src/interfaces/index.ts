export interface INewsPageResponse {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface ICommentResponse {
  by: string;
  id: number;
  kids: number[];
  parent: string;
  text: string;
  time: number;
  type: string;
}
