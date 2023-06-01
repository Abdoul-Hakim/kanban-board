import * as mongodb from "mongodb";
import { Project } from "./Project";

export const collections: {
  projects?: mongodb.Collection<Project>;
} = {};

// connect to the databas
/**
 * Initializes the connection to the database
 * @param uri database uri used to connect to the databsse
 */
async function connectionToDatabase(uri: string) {
  //create mongodb client
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  // connect to the database
  const db = client.db("kanban-board-db");
  await applySchemaValidation(db);
  // TODO consider adding schema validation
  // assign retrived projects
  const projectCollection = db.collection<Project>("projects");
  collections.projects = projectCollection;
}

// update json validation so that the projects will always look the same
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
      },
    },
  };
  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "projects",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("projects", { validator: jsonSchema });
      }
    });
}

export default connectionToDatabase;
