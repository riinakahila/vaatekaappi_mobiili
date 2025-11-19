import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('clothesdb');

export const initialize = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS clothes (id INTEGER PRIMARY KEY NOT NULL, title TEXT, category TEXT, uri TEXT);
    `);
  } catch (error) {
    console.error('Could not open database', error);
  }
}

  export const saveClothes = async ({ title, category, uri }) => {
    try {
      await db.runAsync('INSERT INTO clothes (title, category, uri) VALUES (?, ?, ?)', title, category, uri);
    } catch (error) {
      console.error('could not add info', error)
    }
  }

  export const updateClothesList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from clothes');
      return list;
    } catch (error) {
      console.error('could not get clothes list', error);
    }
  }

  export const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM clothes WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

