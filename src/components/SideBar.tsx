import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

import '../styles/sidebar.scss';

interface SideBarProps {
  onSelectedGenreId: number;
  setGenreId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ onSelectedGenreId, setGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
      <nav className="sidebar">

        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => setGenreId(genre.id)}
              selected={onSelectedGenreId === genre.id}
            />
          ))}
        </div>

    </nav>
  )
}