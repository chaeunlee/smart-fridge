import Realm from 'realm';

// Schema's name
export const INGREDIENTLIST_SCHEMA = 'IngredientList';
export const INGREDIENT_SCHEMA = 'Ingredient';

// Define models and their properties
export const IngredientSchema = {
  name: INGREDIENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    creationDate: 'date',
  },
};

export const IngredientListSchema = {
  name: INGREDIENTLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    ingredients: {type: 'list', objectType: INGREDIENT_SCHEMA},
  },
};

const databaseOptions = {
  path: 'smartfridge.ingredient.realm',
  schema: [IngredientListSchema, IngredientSchema],
  schemaVersion: 0, //oprtional
};

// functions for Ingredients
export const insertNewIngredient = newIngredient =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(INGREDIENT_SCHEMA, newIngredient);
          resolve(newIngredient);
        });
      })
      .catch(error => reject(error));
  });

// Not completed yet
export const updateIngredient = ingredient =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          // Get a TodoList from specific ID
          let updatingIngredient = realm.objectForPrimaryKey(
            INGREDIENT_SCHEMA,
            ingredient.id,
          );
          updateIngredient.name = ingredient.name;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteIngredient = ingredientId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingIngredient = realm.objectForPrimaryKey(
            INGREDIENT_SCHEMA,
            ingredientId,
          );
          realm.delete(deletingIngredient);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteAllIngredients = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          // This will get all records in TODOLIST Table
          let allIngredients = realm.objects(INGREDIENT_SCHEMA);
          realm.delete(allIngredients);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const queryAllIngredients = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allIngredients = realm.objects(INGREDIENT_SCHEMA);

        resolve(allIngredients);
      })
      .catch(error => reject(error));
  });

// realm object
export default new Realm(databaseOptions);
