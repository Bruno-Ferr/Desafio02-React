import { useEffect, useState } from 'react';
import { api } from '../services/api';

import { MovieCard } from './MovieCard';
import { List, ListRowRenderer } from 'react-virtualized';

import '../styles/content.scss';
import { Maximize } from 'react-feather';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  onSelectedGenreId: number;
}


export function Content({ onSelectedGenreId }: ContentProps ) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${onSelectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${onSelectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [onSelectedGenreId]);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) =>  {
    return (
      <div className="movies-list" key={key} style={style}>
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
      </div>
    )
  }

  return(
    <div className="container">

      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
      <List 
        height={900}
        rowHeight={900}
        width={900}
        rowCount={1}
        rowRenderer={rowRenderer}
      />
      </main>

    </div>
  )
}