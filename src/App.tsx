import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { A, Button, Container, Hr, Row, Separator, Spacer, Toolbar, Text, Col, Heading } from 'nes-ui-react'
import './App.css'
import { Game } from './game/game'
import { GameConfig } from './game/config'

export let game: Game;

function App() {

  useEffect(() => {
    game = new Game(GameConfig);
  }, [])

  return (
    <>
      <Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Container roundedCorners title='RapRap @ 640x480' alignTitle='center' style={{ backgroundColor: '#000', maxWidth: 700 }}>
          <div id="game"></div>
        </Container>
      </Row>
      </>
    )
}
export default App;