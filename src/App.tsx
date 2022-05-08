import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { A, Button, Container, Hr, Row, Separator, Spacer, Toolbar, Text, Col, Heading } from 'nes-ui-react'
import './App.css'
import { Game } from './game/game'
import { GameConfig } from './game/config'

export let game: Game;

function App() {
  
  const canvasRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    game = new Game(GameConfig);
  }, [])

  useEffect(() => {

    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.addEventListener('fullscreenchange', (event) => {
      if (canvasRef.current) {
        if (!document.fullscreenElement) {
            canvasRef.current.style.position = 'relative';
            canvasRef.current.style.display = 'block';
            canvasRef.current.style.width = '640px';
            canvasRef.current.style.height = '480px';
            canvasRef.current.style.cursor = 'none';

        } else {
            canvasRef.current.style.position = 'absolute';
            canvasRef.current.style.display = 'block';
            canvasRef.current.style.width = '100vw';
            canvasRef.current.style.height = '100vh';
            canvasRef.current.style.cursor = 'none';
        }
      }
    })
  }, [canvasRef.current])

  const onFullscreenClick = useCallback(() => {

    if (!canvasRef.current) {
      return;
    }
    game.scale.startFullscreen()
  }, [canvasRef])

  return (
    <>
      <Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Container roundedCorners title='RapRap @ 640x480' alignTitle='center' style={{ backgroundColor: '#000', maxWidth: 700 }}>
          <div id="game" className='game-container' ref={canvasRef}></div>
          <Button onClick={onFullscreenClick}>Fullscreen</Button>
        </Container>
      </Row>
      </>
    )
}
export default App;