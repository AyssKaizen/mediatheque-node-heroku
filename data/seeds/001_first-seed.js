const bcrypt = require('bcryptjs')

const users = [
  {
    us_lastname: 'Jaeger',
    us_firstname: 'Eren',
    us_email: 'eren@mail.fr',
    us_birthday: '1990-01-01',
    us_address: '24 chemin du lion',
    us_city: 'Lyon',
    us_postcode: '69200',
    us_active: true,
    us_password: bcrypt.hashSync('eren123', 10),
    us_admin: true
  },
  {
    us_lastname: 'Ackerman',
    us_firstname: 'Mikasa',
    us_email: 'mikasa@mail.fr',
    us_birthday: '1990-09-01',
    us_address: '24 chemin du shingashina',
    us_city: 'Shiganshina',
    us_postcode: '31200',
    us_active: true,
    us_password: bcrypt.hashSync('mikasa123', 10),
    us_admin: false
  },
  {
    us_lastname: 'Braun',
    us_firstname: 'Reiner',
    us_email: 'reiner@mail.fr',
    us_birthday: '1990-01-01',
    us_address: '24 chemin de mar',
    us_city: 'Mar',
    us_postcode: '31000',
    us_active: true,
    us_password: bcrypt.hashSync('reiner123', 10),
    us_admin: false
  },
  {
    us_lastname: 'Ackerman',
    us_firstname: 'Livai',
    us_email: 'livai@mail.fr',
    us_birthday: '1990-01-01',
    us_address: '24 chemin des bas fonds',
    us_city: 'Shiganshina',
    us_postcode: '69000',
    us_active: true,
    us_password: bcrypt.hashSync('livai123', 10),
    us_admin: false
  },
  {
    us_lastname: 'Arlet',
    us_firstname: 'Armin',
    us_email: 'armin@mail.fr',
    us_birthday: '1990-01-01',
    us_address: '34 chemin de trost',
    us_city: 'Shiganshina',
    us_postcode: '31000',
    us_active: false,
    us_password: bcrypt.hashSync('armin123', 10),
    us_admin: false
  },
];

exports.seed = function (knex) {
  return knex('users').del()
  .then(() => {
    return knex('users').insert(users)
  })
};
