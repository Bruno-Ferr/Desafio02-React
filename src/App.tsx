import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import './styles/content.scss';
import { useCallback } from 'react';


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar 
        onSelectedGenreId={ selectedGenreId } 
        setGenreId={ handleClickButton }
      />

      <Content 
        onSelectedGenreId={ selectedGenreId }
      />
      
    </div>
  )
}