import Mongoose from 'mongoose';
import Promise from 'promise';
import Config from '../Config';
import Log from '../Log';
import Series from './Schemas/Series';

class DB {
    connect() {
        return new Promise((resolve, reject) => {
            this.connection = Mongoose.connect(Config.Database.ConnectionString).connection;
            this.connection.on('error', (error) => {
                Log.error(error);
                reject(error);
            });
            this.connection.once('open', () => {
                const schemas = [
                    Series
                ];

                schemas.forEach((schema) => {
                    this[schema.name] = this.connection.model(schema.name, schema.schema);
                });
                resolve();
            });
        });
    }
}

export default new DB();
