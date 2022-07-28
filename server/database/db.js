import mongoose from 'mongoose';

const Connection = async (username, password) => {
    // const URL = `mongodb+srv://${username}:${password}@cluster0.lfqepr4.mongodb.net/?retryWrites=true&w=majority`
    const URL = `mongodb://${username}:${password}@ac-j8mclb3-shard-00-00.lfqepr4.mongodb.net:27017,ac-j8mclb3-shard-00-01.lfqepr4.mongodb.net:27017,ac-j8mclb3-shard-00-02.lfqepr4.mongodb.net:27017/?ssl=true&replicaSet=atlas-1kgjxo-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;