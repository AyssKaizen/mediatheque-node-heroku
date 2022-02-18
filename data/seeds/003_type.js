
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('type').del()
    .then(function () {
      // Inserts seed entries
      return knex('type').insert([
        {ty_name: 'livres'},
        {ty_name: 'comics'},
        {ty_name: 'mangas'},
        {ty_name: 'livres audio'},
        {ty_name: 'albums'},
        {ty_name: 'revues'},
      ]);
    });
};
