import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
}).catch(err => {
    console.error('Error connecting to the database: ', err);
});

export default pool;