import React, { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { AlbumType, SongType } from '../types';
import getMusics from '../services/musicsAPI';
import { useParams } from 'react-router-dom';

type InfoMusicProps = {
  trackName: string;
  previewUrl: string;
};

function InfoMusics({ trackName, previewUrl } : InfoMusicProps) {
  return (
    <div>
      <p>
        { trackName }
      </p>
      <audio data-testid="audio-component" src={previewUrl} controls>
      <track kind="captions" />
      O seu navegador não suporta o elemento{" "} <code>audio</code>.
      </audio>
    </div>
  );
}

export function Album() {
  const [music, setMusic] = useState<SongType[]>([]); // nao esquecer que tem que ser vazio no começo*******
  const [infoMusic, setInfoMusic] = useState<AlbumType | null>(null); // nao esquecer que tem que ser nulo no começo*******
  const [loading, setLoading] = useState(true); //  é true,pra ter a mensagem Carregando... até que os dados sejam obtidos da API.
  const { id = '' } = useParams();

  useEffect(() => {
    setLoading(true);
  
    // Função assíncrona para buscar os dados do álbum com base no 'id' fornecido
    async function albumData () {
      const result = await getMusics(id); // Faz a requisição à API para obter os dados do álbum
      setInfoMusic(result[0]);

      const onlyMusics = result.filter((item) => 'trackId' in item) as SongType[]; // Filtra os resultados para obter apenas as músicas do álbum
      setMusic(onlyMusics); 
      setLoading(false); 
    }
    albumData();
  }, [id]);

  return(
    <div>
      { loading ? (<Loading />)
        : (
          <>
            { infoMusic !== null && (
              <div>
                <section
                data-testid="artist-name"
                > { infoMusic.artistName }
                </section>
              
                <section
                data-testid="album-name"
                > { infoMusic?.collectionName }
                </section>
              </div>
            )}
            { music.map((music, index) => (
              <InfoMusics
                key={index}
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))}
          </>
      )}
    </div>
  )}
