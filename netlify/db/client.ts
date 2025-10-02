import { MongoClient } from 'mongodb';

if(!process.env.MONGO_URI) throw new Error("Mongo uri environment varible not found. :(");
export const client = new MongoClient(process.env.MONGO_URI);