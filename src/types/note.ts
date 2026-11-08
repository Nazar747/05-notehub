export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag["tag"];
}

export interface NoteTag {
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
