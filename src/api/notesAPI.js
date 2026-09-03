import axios from "axios";

const BASE_URL = "https://note-sigma-black.vercel.app/api/v1/notes";

const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken");
  return {
    token: `3b8ny__${token}`,
  };
};

// Get the current logged-in user's notes (fast, ~300ms)
export const getUserNotes = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: getAuthHeaders(),
    });
    return response.data?.notes || [];
  } catch (error) {
    // When a user has 0 notes, backend returns 404 "not notes found"
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// Get all public notes across the database (5,900+ notes)
export const getAllNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allNotes`, {
      headers: getAuthHeaders(),
    });
    return response.data?.notes || [];
  } catch (error) {
    console.error("Failed to fetch allNotes:", error);
    return [];
  }
};

// Default getNotes uses getUserNotes for fast, reliable response
export const getNotes = getUserNotes;

export const addNote = async (noteData) => {
  const response = await axios.post(BASE_URL, noteData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateNote = async ({ id, title, content }) => {
  const response = await axios.put(
    `${BASE_URL}/${id}`,
    { title, content },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};