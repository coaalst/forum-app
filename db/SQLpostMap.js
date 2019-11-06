/**
 * Map sql functions for easier access
 */
var SQLpostMap = {
    insert: 'INSERT INTO posts(id, title, tweet, user_id) VALUES(?,?,?,?)',
    update: 'update posts set title=?, tweet=? where id=?',
    delete: 'delete from posts where id=?',
    queryById: 'select * from posts where id=?',
    queryAll: 'select * from posts'
};

module.exports = SQLpostMap;