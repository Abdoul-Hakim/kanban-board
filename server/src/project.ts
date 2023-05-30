import * as mongodb from "mongodb";
// interface of the project
export interface Project {
  _id: mongodb.ObjectId;
  name: string;
  description: string;
}