import * as mongodb from 'mongodb';
import { Project } from './Project';


export const collections: {
  projects?: mongodb.Collection<Project>
} = {};


// connect to the databas
/**
 * Initializes the connection to the database
 * @param uri database uri used to connect to the databsse
 */
async function connectToDatabase(uri:string) {
  //create mongodb client
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  // connect to the database
  const db = client.db("kanban-board-db");
  // TODO consider adding schema validation
  // assign retrived projects
  const projectCollection = db.collection<Project>("projects");
  collections.projects = projectCollection;
}