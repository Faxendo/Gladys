

module.exports.datastores = {

  // In previous versions, datastores (then called 'connections') would only be loaded
  // if a model was actually using them.  Starting with Sails 1.0, _all_ configured
  // datastores will be loaded, regardless of use.  So we'll only include datastores in
  // this file that were actually being used.  Your original `connections` config is
  // still available as `config/connections-old.js.txt`.

  test: {
    adapter: require('sails-mysql'),
    url: 'mysql://' + (process.env.MYSQL_USER || 'root') + ':' +  ( (typeof process.env.MYSQL_PASSWORD !== 'undefined') ? process.env.MYSQL_PASSWORD : 'root') + '@' +  (process.env.MYSQL_HOST || 'localhost') + ':' + (process.env.MYSQL_PORT || 3306) + '/' + (process.env.MYSQL_DATABASE || 'gladystest')
  },

  default: {
    adapter: require('sails-mysql'),
    url: 'mysql://' + (process.env.MYSQL_USER || 'root') + ':' +  ( (typeof process.env.MYSQL_PASSWORD !== 'undefined') ? process.env.MYSQL_PASSWORD : 'root') + '@' +  (process.env.MYSQL_HOST || 'localhost') + ':' + (process.env.MYSQL_PORT || 3306) + '/' + (process.env.MYSQL_DATABASE || 'gladys')
  },
  
  /*travis: {
    adapter: 'sails-mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'travis',
    password: '',
    database: 'gladystest'
  },*/

};
