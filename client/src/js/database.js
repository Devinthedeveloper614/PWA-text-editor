import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store.
	const store = tx.objectStore("jate");
  // Get confirmation of the request.
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('putDb - data saved successfully ', result);

}

// logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");
  // Open up the desired object store.
	const store = tx.objectStore("jate");
  // Get confirmation of the request.
  const request = store.get(1);

	// Get confirmation of the request.
	const result = await request;

  result? console.log("getDB - data retrieved from the database", result.value)
		    : console.log("getDB - data not found in the database");
  
  return result?.value;
}


initdb();
