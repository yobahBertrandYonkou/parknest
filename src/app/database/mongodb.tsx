import { MongoClient } from 'mongodb';

// mongo db url
const databaseUrl = 'mongodb://localhost:27017'

// Creating an object of mongo client
const client = new MongoClient(databaseUrl);

// Connecting to database
client.connect();


export default client.db('parknest');