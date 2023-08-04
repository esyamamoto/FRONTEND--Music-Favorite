import React from 'react';

type InfoMusicProps = {
  trackName: string;
  previewUrl: string;
};

export function CustomInfoMusic({ trackName, previewUrl } : InfoMusicProps) {
  return (
    <div>
      <p>
        { trackName }
      </p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        { ' ' }
        <code>audio</code>
        .
      </audio>
    </div>
  );
}
