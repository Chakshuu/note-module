import { getDB, insertDB, saveDB } from "./db.js";

export const newNote = async (note, tags) => {
  const data = {
    id: Date.now(),
    content: note,
    tags,
  };
  await insertDB(data);
  return data;
};

export const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNotes = async (filter) => {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.content.toLowerCase()),
  );
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const isMatch = notes.find((note) => note.id === id);

  if (isMatch) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => await saveDB({ notes: [] });
