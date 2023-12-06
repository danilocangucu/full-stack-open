import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../../flight-diary-main/src/types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const createEntry = async (
  object: NewDiaryEntry
): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<NewDiaryEntry>(baseUrl, object);
    return response.data as DiaryEntry;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};
