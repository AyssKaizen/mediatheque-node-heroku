const profiles = [
  {
    name: 'John'
  },
  {
    name: 'Abigail'
  },
  {
    name: 'Patty'
  },
  {
    name: 'Sally'
  },
  {
    name: 'Gary'
  }
];

exports.seed = function (knex) {
  return knex('profiles').del()
  .then(() => {
    return knex('profiles').insert(profiles)
  })
};
