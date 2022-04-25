import connection from "./conn_db";

export default class User {
    public static async createUser(username, password, token) : Promise<boolean> {
        const sql = `INSERT INTO user_auth ( username, password, token) VALUES (?, ?, ?)`; 

        return new Promise((resolve, reject) => {
            connection.query(sql, [username, password, token],function (err, result) {  
                if (err)  {
                    console.error(err);
                    if (err.code === 'ER_DUP_ENTRY') {
                        return resolve(false);
                    }
                    return reject(err);
                }
    
                console.log("Number of records inserted: " + result.affectedRows);
                
                return resolve(true);
            });    
        });
    }
    
    public static async findTokenByUsername(username) : Promise<string> {
    const sql = `SELECT U.token FROM user_auth U WHERE U.username = ?`;

        return new Promise((resolve, reject) => {
            connection.query(sql, [username], function (err, result) { 
                if (err) return reject(err);
    
                return resolve(result[0].token);
            });
        })
    }

}