import Realm from 'realm';

// Schema's name
export const BOOKMARKLIST_SCHEMA = 'BookmarkList';
export const BOOKMARK_SCHEMA = 'Bookmark';

// Define models and their properties
export const BookmarkSchema = {
  name: BOOKMARK_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    image: 'string',
    creationDate: 'date',
  },
};

export const BookmarkListSchema = {
  name: BOOKMARKLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    bookmarks: {type: 'list', objectType: BOOKMARK_SCHEMA},
  },
};

const databaseOptions = {
  path: 'smartfridge.bookmark.realm',
  schema: [BookmarkListSchema, BookmarkSchema],
  schemaVersion: 0, //oprtional
  migration: (oldVersion, newVersion) => {
    const oldObjects = oldVersion.objects(BOOKMARK_SCHEMA);
    const newObjects = newVersion.objects(BOOKMARK_SCHEMA);
    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].id = oldObjects[i].id;
      newObjects[i].name = oldObjects[i].name;
      newObjects[i].creationDate = oldObjects[i].creationDate;
      newObjects[i].image = null;
    }
  },
};

export const insertNewBookmark = newBookmark =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(BOOKMARK_SCHEMA, newBookmark);
          resolve(newBookmark);
        });
      })
      .catch(error => reject(error));
  });

// Not completed yet
// export const updateBookmark = bookmark =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           // Get a TodoList from specific ID
//           let updatingIngredient = realm.objectForPrimaryKey(
//             BOOKMARK_SCHEMA,
//             bookmark.id,
//           );
//           updateIngredient.name = bookmark.name;
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });

export const deleteBookmark = bookmarkId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingBookmark = realm.objectForPrimaryKey(
            BOOKMARK_SCHEMA,
            bookmarkId,
          );
          realm.delete(deletingBookmark);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteAllBookmarks = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          // This will get all records in TODOLIST Table
          let allBookmarks = realm.objects(BOOKMARK_SCHEMA);
          realm.delete(allBookmarks);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const queryAllBookmarks = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allBookmarks = realm.objects(BOOKMARK_SCHEMA);

        resolve(allBookmarks);
      })
      .catch(error => reject(error));
  });

// realm object
export default new Realm(databaseOptions);
