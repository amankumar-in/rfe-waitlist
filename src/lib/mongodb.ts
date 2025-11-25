import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
  socketTimeoutMS: 30000, // 30 seconds timeout for socket operations
  connectTimeoutMS: 5000, // 5 seconds timeout for initial connection
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 1, // Maintain at least 1 socket connection
  retryWrites: true,
  retryReads: true,
};

// Use global variable in both dev and production to reuse connections
// This is especially important for serverless environments like Render
let globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
  _mongoClientPromise?: Promise<MongoClient>;
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalWithMongo._mongoClientPromise = client.connect().then((client) => {
    console.log('MongoDB connected successfully');
    globalWithMongo._mongoClient = client;
    return client;
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
    // Clear the promise on error so we can retry
    globalWithMongo._mongoClientPromise = undefined;
    throw error;
  });
}

clientPromise = globalWithMongo._mongoClientPromise;

// Export a function that ensures connection is ready
export default clientPromise;


