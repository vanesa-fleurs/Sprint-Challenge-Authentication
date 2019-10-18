const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Vanesa', password: bcrypt.hashSync("test", 10)},
        {id: 2, username: 'Hernandez', password: bcrypt.hashSync("test", 10)},
        {id: 3, username: 'Flores', password: bcrypt.hashSync("test", 10)}
      ]);
    });
};
