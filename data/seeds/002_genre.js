
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('genre').del()
    .then(function () {
      // Inserts seed entries
      return knex('genre').insert([
        {ge_name: 'fantastique'},
        {ge_name: 'policier'},
        {ge_name: 'aventure'},
        {ge_name: 'drame'},
        {ge_name: 'théatre'},
        {ge_name: 'aventure'},
        {ge_name: 'roman'},
        {ge_name: 'documentaire'},
        {ge_name: 'littérature'},
        {ge_name: 'conte'},
        {ge_name: 'romance'},
        {ge_name: 'science-fiction'},
        {ge_name: 'historique'},
        {ge_name: 'education'},
        {ge_name: 'politique'},
        {ge_name: 'santé'},
        {ge_name: 'sport'},

      ]);
    });
};
