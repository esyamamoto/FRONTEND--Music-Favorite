import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Loading } from './Loading';
import { AlbumType } from '../types';

export function Search() {
  const [nameArtist, setnameArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState<AlbumType[]>([]);
  const [searchArtist, setsearchArtist] = useState('');
  const [searchRequest, setsearchRequest] = useState(false);
  const isArtistValid = nameArtist.length >= 2;
  // Ao clicar em pesquisar, a requisição é feita usando a searchAlbumsAPI;
  // Quando searchRequest é true, a busca é acionada
  useEffect(() => {
    if (searchRequest) {
      setLoading(true); // Ativa o estado de loading para indicar que a busca está em andamento

      searchAlbumsAPI(nameArtist)
        .then((result) => {
          setAlbum(result); // Atualiza o estado album com os álbuns retornados pela API
          setLoading(false); // Desativa o estado de loading, indicando que a busca foi concluída
          setsearchRequest(false); // Reseta o estado de searchRequest para evitar chamadas adicionais
          setsearchArtist(nameArtist); // Armazena o nome do artista pesquisado em searchArtist
          setnameArtist(''); // Limpa o input após a busca
        });
    }
  }, [searchRequest, nameArtist]);

  // Função acionada ao clicar no botão de pesquisa
  const onClickSearch = async () => {
    if (isArtistValid) {
      setsearchRequest(true);
    }
  };

  return (
    <div>
      { loading ? (<Loading />)
        : (
          <section>
            {/* Ao navegar para a rota /search através do login, o input e o botão estão presentes na tela; */}
            <input
              type="text"
              placeholder="Insira o nome de Artista"
              data-testid="search-artist-input"
              value={ nameArtist }
              onChange={ (e) => setnameArtist(e.target.value) }
            />
            {/* O botão está habilitado somente se o input de nome tiver 2 ou mais caracteres. */}
            <button
              type="button"
              disabled={ !isArtistValid }
              data-testid="search-artist-button"
              onClick={ onClickSearch }
            >
              Entrar
            </button>

            {/*-----------------------------------------------------------------------------------------------------------
            - Ao receber o retorno da API, os álbuns são listados na tela;
            - Caso a API não retorne nenhum álbum, a mensagem Nenhum álbum foi encontrado é exibida;
            - Existe um link para cada álbum listado que redirecione para a rota /album/:id.
            -----------------*/}

            {(album.length > 0 ? (
              <div>
                <p>{`Resultado de álbuns de: ${searchArtist}`}</p>
                {album
                  .map(({ artistName, artworkUrl100, collectionName, collectionId }) => (
                    <div key={ collectionId } className="loading">
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        <img src={ artworkUrl100 } alt={ collectionName } />
                      </Link>
                      <p>{ collectionName }</p>
                      <p>{ artistName }</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Nenhum álbum foi encontrado</p>
            ))}
          </section>
        )}
    </div>
  );
}
