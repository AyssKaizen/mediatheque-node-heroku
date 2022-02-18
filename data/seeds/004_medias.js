
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('medias').del()
    .then(function () {
      // Inserts seed entries
      return knex('medias').insert([
        {
          me_title: 'Game of thrones',
          me_release_date: '17/04/2011',
          me_image: '../../public/img/fire&bloodred.jpeg',
          me_author: 'George R.R Martin',
          me_type: 1,
          me_genre: 1
        },
        {
          me_title: 'Fire and blood',
          me_release_date: '20/11/2018',
          me_image: '../../public/img/fire&bloodred.jpeg',
          me_author: 'George R.R Martin',
          me_type: 1,
          me_genre: 1
        },
        {
          me_title: 'Le faucon déniché',
          me_release_date: '17/04/2011',
          me_image: '',
          me_author: 'Jean-Côme Noguès',
          me_type: 4,
          me_genre: 9
        },
        {
          me_title: 'Shingeki no kyojin',
          me_release_date: '17/04/2012',
          me_image: '',
          me_author: 'Hajime isayama',
          me_type: 3,
          me_genre: 12
        },
        {
          me_title: 'Avengers',
          me_release_date: '17/04/2010',
          me_image: '',
          me_author: 'Stan lee',
          me_type: 2,
          me_genre: 1
        },
        {
          me_title: 'les contes de termer',
          me_release_date: '17/04/2010',
          me_image: '',
          me_author: 'masashi kishimoto',
          me_type: 1,
          me_genre: 10
        },
        {
          me_title: 'Bleach',
          me_release_date: '17/04/2010',
          me_image: '',
          me_author: 'Tite Kubo',
          me_type: 3,
          me_genre: 3
        },
        {
          me_title: 'la marche de ouros',
          me_release_date: '17/04/2010',
          me_image: '',
          me_author: 'kyle Kuabo',
          me_type: 4,
          me_genre: 5
        },
        {
          me_title: 'Antigone',
          me_release_date: '17/04/1991',
          me_image: '',
          me_author: 'jean saipa',
          me_type: 1,
          me_genre: 9
        },
        {
          me_title: 'Ariane',
          me_release_date: '17/04/1994',
          me_image: '',
          me_author: 'jean saitout',
          me_type: 6,
          me_genre: 8
        },
        {
          me_title: 'Toukancre',
          me_release_date: '17/04/1994',
          me_image: '',
          me_author: 'george de la jungle',
          me_type: 6,
          me_genre: 8
        },
        {
          me_title: 'Spider-man vs Venom',
          me_release_date: '17/04/2000',
          me_image: '',
          me_author: 'Stan lee',
          me_type: 2,
          me_genre: 1
        },
        {
          me_title: 'Psycho pass',
          me_release_date: '17/04/2008',
          me_image: '',
          me_author: 'Tite Kubo',
          me_type: 3,
          me_genre: 2
        },
        {
          me_title: 'Antigone',
          me_release_date: '17/04/1991',
          me_image: '',
          me_author: 'jean saipa',
          me_type: 4,
          me_genre: 9
        },
        {
          me_title: 'TDD kesako',
          me_release_date: '20/11/2021',
          me_image: '',
          me_author: 'Kent Beck',
          me_type: 1,
          me_genre: 14
        },

      ]);
    });
};