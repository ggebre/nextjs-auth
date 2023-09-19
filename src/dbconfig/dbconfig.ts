
import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
    
        connection.on('connected', () => {
            console.log('MONGOdb connected successfully')
        });
        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure MongoDB is running. ' + err)
        })
    } catch (error) {
        console.log(error)
    }
}

// import mongoose from 'mongoose'
// declare global {
//   var mongoose: any // This must be a `var` and not a `let / const`
// }

// const MONGODB_URI = process.env.MONGO_URI!

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//         console.log(mongoose)
//       return mongoose
//     })
//   }
//   try {
//     cached.conn = await cached.promise
//   } catch (e) {
//     cached.promise = null
//     throw e
//   }
//   console.log(cached.conn)
//   return cached.conn
// }

// export default connectDB

