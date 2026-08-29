import type { CreateNote, Note, RegisterRequest } from "@/types/note";
import type { User } from "@/types/user";
import { nextServer } from "./api";
import { api } from "@/app/api/api";


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

interface LoginRequest {
  email: string;
  password: string;
}

interface UpdateUserRequest {
  username?: string;
}

export async function fetchNotes({
  query,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<Response> {
  const response = await api.get<Response>("/notes", {
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
  const response = await nextServer.post<Note>("/notes", {
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
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession() {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function login(data: LoginRequest) {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
}

export async function updateMe(
  payload: UpdateUserRequest
): Promise<User> {
  const response = await nextServer.patch<User>("/users/me", payload);
  return response.data;
}