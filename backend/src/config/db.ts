import mongoose from "mongoose";

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: CachedConnection | undefined;
}

const cached: CachedConnection = globalThis.mongooseConnection || {
  conn: null,
  promise: null
};

globalThis.mongooseConnection = cached;

export async function connectDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
