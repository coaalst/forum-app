module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'dbuser',
        password: 'dbpassword',
        database: 'db',
        port: '3306',
        queueLimit : 0,
        connectionLimit : 0,
    },
    SQLpostMap: {
        insert: 'INSERT INTO posts(id, title, tweet, userid) VALUES(NULL,?,?,?)',
        update: 'update posts set title=?, tweet=? where id=?',
        delete: 'delete from posts where id=',
        queryById: 'select * from posts where id=',
        queryByUserId: 'select * from posts where userid=',
        queryAll: 'select * from posts',
        queryByParams: 'select * from posts where title like ? and tweet like ?',
        queryByTitle: 'select * from posts where title like ?',
        queryByTweet: 'select * from posts where tweet like ?',
    },
    SQLuserMap: {
        insert: 'INSERT INTO user(name, password) VALUES(?,?)',
        queryById: 'select * from user where id=?',
        queryByCred: 'select * from user where name=? and password=?',
    }
};