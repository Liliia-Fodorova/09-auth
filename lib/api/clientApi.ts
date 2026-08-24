import type { CreateNote, Note, RegisterRequest } from "@/types/note";
import { nextServer } from "./api";
import { LoginRequest, UpdateUserRequest, User } from "@/types/user";

interface Response {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  query: string;
  page: number;
  perPage: number;
  tag?: string;
}

export async function fetchNotes({
  query,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<Response> {
  const response = await nextServer.get<Response>(`/notes`, {
    params: {
      search: query,
      page,
      perPage,
      tag,
    },
  });

  return response.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNote): Promise<Note> {
  const response = await nextServer.post<Note>(`/notes`, {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>(`/auth/register`, data);
  return res.data;
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};