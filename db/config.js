module.exports = {
    mysql: {
        host: 'localhost',
        user: 'dbuser',
        password: 'dbpassword',
        database: 'db',
        port: '3306'
    },
    SQLpostMap = {
        insert: 'INSERT INTO posts(id, title, tweet, user_id) VALUES(?,?,?,?)',
        update: 'update posts set title=?, tweet=? where id=?',
        delete: 'delete from posts where id=',
        queryById: 'select * from posts where id=',
        queryAll: 'select * from posts'
    },
    SQLuserMap = {
        insert: 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
        update: 'update user set name=?, age=? where id=?',
        delete: 'delete from user where id=?',
        queryById: 'select * from user where id=?',
        queryAll: 'select * from user'
    }
};