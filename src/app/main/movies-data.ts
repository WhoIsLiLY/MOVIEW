export interface Movie {
    id: number;
    title: string;
    poster: string;
    genre: string;
    releaseDate: string;
    averageRating: number | null;
    director: string;
    casting: { actor: string; role: string }[];
    synopsis: string;
    trailer_url: string;
  }
  
  export let movies: Movie[] = [
    {
      id: 1,
      title: 'Aquaman and The Lost Kingdom',
      poster: 'assets/movies/mobile/p1.jpg',
      genre: 'Action, Adventure, Fantasy',
      releaseDate: '2023-12-25',
      averageRating: 6.9,
      director: 'James Wan',
      casting: [
        { actor: 'Jason Momoa', role: 'Arthur Curry / Aquaman' },
        { actor: 'Amber Heard', role: 'Mera' },
        { actor: 'Patrick Wilson', role: 'Orm / Ocean Master' }
      ],
      synopsis: 'Arthur Curry, the half-human, half-Atlantean hero, must face the consequences of his past as he tries to stop a new threat that could destroy both the surface and the underwater kingdoms.',
      trailer_url: 'https://www.youtube.com/watch?v=UGc5Tzz19UY'
    },
    {
      id: 2,
      title: 'Wonka',
      poster: 'assets/movies/mobile/p2.jpg',
      genre: 'Adventure, Family, Fantasy',
      releaseDate: '2023-12-15',
      averageRating: 7.3,
      director: 'Paul King',
      casting: [
        { actor: 'Timothée Chalamet', role: 'Willy Wonka' },
        { actor: 'Olivia Colman', role: 'Lady Louisa' },
        { actor: 'Keegan-Michael Key', role: 'Fickelgruber' }
      ],
      synopsis: 'A young Willy Wonka embarks on an adventure to discover the secrets behind his beloved chocolate factory and the creation of his iconic chocolate bars.',
      trailer_url: 'https://www.youtube.com/watch?v=otNh9bTjXWg'
    },
    {
      id: 3,
      title: 'Minecraft Movie',
      poster: 'assets/movies/mobile/p3.jpg',
      genre: 'Action, Adventure, Family',
      releaseDate: '2024-04-10',
      averageRating: 5.8,
      director: 'Rob McElhenney',
      casting: [
        { actor: 'Steve Carell', role: 'The Architect' },
        { actor: 'Emma Stone', role: 'Lily' },
        { actor: 'Chris Hemsworth', role: 'Steve' }
      ],
      synopsis: 'When a group of teenagers discover a portal to the world of Minecraft, they must join forces with unlikely heroes to stop an ancient enemy from conquering both the digital world and reality.',
      trailer_url: 'https://youtu.be/wJO_vIDZn-I?si=NEir6uCj28FrnPny'
    },
    {
      id: 4,
      title: 'Spiderman: Across the Spider Verse',
      poster: 'assets/movies/mobile/p4.jpg',
      genre: 'Animation, Action, Adventure',
      releaseDate: '2023-06-02',
      averageRating: 9.1,
      director: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
      casting: [
        { actor: 'Shameik Moore', role: 'Miles Morales / Spider-Man' },
        { actor: 'Hailee Steinfeld', role: 'Gwen Stacy / Spider-Woman' },
        { actor: 'Oscar Isaac', role: 'Miguel O\'Hara / Spider-Man 2099' }
      ],
      synopsis: 'Miles Morales ventures through the multiverse and meets several other Spider-People as they team up to stop a new, powerful threat that could bring chaos to their worlds.',
      trailer_url: 'https://www.youtube.com/watch?v=cqGjhVJWtEg'
    },
    {
      id: 5,
      title: 'Transformer: Rise of the Beast',
      poster: 'assets/movies/mobile/p5.jpg',
      genre: 'Action, Adventure, Sci-Fi',
      releaseDate: '2023-06-09',
      averageRating: 6.5,
      director: 'Steven Caple Jr.',
      casting: [
        { actor: 'Anthony Ramos', role: 'Noah Diaz' },
        { actor: 'Dominique Fishback', role: 'Elena Wallace' },
        { actor: 'Peter Cullen', role: 'Optimus Prime (voice)' }
      ],
      synopsis: 'As humanity and the Autobots face a new foe in the form of the Maximals, Noah and Elena join forces with Optimus Prime and the Autobots to stop the powerful threats coming from all over the universe.',
      trailer_url: 'https://www.youtube.com/watch?v=itnqEauWQZM'
    },
    {
      id: 6,
      title: 'Night Swim',
      poster: 'assets/movies/mobile/p6.jpg',
      genre: 'Drama, Horror, Mystery',
      releaseDate: '2023-09-21',
      averageRating: 7.2,
      director: 'Bryan Bertino',
      casting: [
        { actor: 'Olivia Grace Applegate', role: 'Samantha' },
        { actor: 'Luke Hemsworth', role: 'Ethan' },
        { actor: 'David Blue', role: 'Detective Novak' }
      ],
      synopsis: 'A couple’s relaxing night at the pool turns into a nightmare when they uncover a terrifying secret lurking in the water.',
      trailer_url: 'https://www.youtube.com/watch?v=3f1nL6zGFak'
    },
    {
      id: 7,
      title: 'The Book of Clarence',
      poster: 'assets/movies/mobile/p7.jpg',
      genre: 'Drama, Comedy',
      releaseDate: '2023-11-03',
      averageRating: 7.1,
      director: 'Jeymes Samuel',
      casting: [
        { actor: 'Lakeith Stanfield', role: 'Clarence' },
        { actor: 'Idris Elba', role: 'King Solomon' },
        { actor: 'Tessa Thompson', role: 'Queen Manya' }
      ],
      synopsis: 'In an ancient kingdom, Clarence, a man burdened by a dark past, embarks on a transformative journey to uncover his destiny while grappling with the powers of fate and free will.',
      trailer_url: 'https://www.youtube.com/watch?v=2s3wL2I4BBA'
    },
    {
      id: 8,
      title: 'Ne Zha 2',
      poster: 'assets/movies/mobile/p8.jpg',
      genre: 'Animation, Action, Adventure',
      releaseDate: '2024-02-23',
      averageRating: 7.8,
      director: 'Yu Yang',
      casting: [
        { actor: 'Leo Wu', role: 'Ne Zha' },
        { actor: 'Tao Zhao', role: 'Li Jing' },
        { actor: 'Jiang Yun', role: 'Ao Bing' }
      ],
      synopsis: 'Ne Zha embarks on a new adventure after the events of the first film, facing powerful new enemies and discovering secrets about his origins that could change his destiny forever.',
      trailer_url: 'https://www.youtube.com/watch?v=ZfVYgWYaHmE'
    },
    {
      id: 9,
      title: 'Mission Impossible: The Final Reckoning',
      poster: 'assets/movies/mobile/p9.jpg',
      genre: 'Action, Thriller, Adventure',
      releaseDate: '2025-05-23',
      averageRating: null,
      director: 'Christopher McQuarrie',
      casting: [
        { actor: 'Tom Cruise', role: 'Ethan Hunt' },
        { actor: 'Rebecca Ferguson', role: 'Ilsa Faust' },
        { actor: 'Simon Pegg', role: 'Benji Dunn' }
      ],
      synopsis: 'Ethan Hunt faces his most dangerous mission yet as a global conspiracy threatens to destroy everything he’s fought for, and he must rely on his team to save the world one final time.',
      trailer_url: 'https://www.youtube.com/watch?v=avz06PDqDbM'
    },
    {
      id: 10,
      title: 'Wanted Man',
      poster: 'assets/movies/mobile/p10.jpg',
      genre: 'Action, Drama, Thriller',
      releaseDate: '2024-03-18',
      averageRating: 0,
      director: 'John Doe',
      casting: [
        { actor: 'Jason Statham', role: 'Jake' },
        { actor: 'Charlize Theron', role: 'Helen' },
        { actor: 'Gary Oldman', role: 'Victor' }
      ],
      synopsis: 'A former hitman must go on the run after being framed for a crime he didn’t commit, while a relentless detective pursues him across the country in a race against time.',
      trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];
  