
export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface Reflection {
  title: string;
  body: string;
  verse?: string;
}

export enum AppState {
  HOME = 'home',
  REFLECTION = 'reflection',
  PRAYER = 'prayer',
  VISUAL = 'visual'
}
