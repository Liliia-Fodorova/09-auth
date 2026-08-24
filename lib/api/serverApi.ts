import { Note } from "@/types/note";
import axios from "axios";
import { cookies } from "next/headers";

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

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchNotes({
  query,
  page,
  perPage,
  tag,
}: FetchNotesProps): Promise<Response> {
  const cookieStore = await cookies();
  const response = await axios.get<Response>(`${backendUrl}/notes`, {
    params: {
      search: query,
      page,
      perPage,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await axios.get<Note>(`${backendUrl}/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await axios.post(
    `${backendUrl}/auth/refresh`,
    {},
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return res;
}