import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { CardsContextProvider } from './context/cards-context'
import { DatesContextProvider } from './context/date-context'
import { FlashCardsContextProvider } from './context/flash-cards-context'
import { HomeContextProvider } from './context/home-context'
import { FacesContextProvider } from './context/faces-context'
import { WordsContextProvider } from './context/words-context'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <HashRouter>
      <HomeContextProvider>
        <CardsContextProvider>
          <DatesContextProvider>
            <FacesContextProvider>
              <WordsContextProvider>
                <FlashCardsContextProvider>
                  <App />
                </FlashCardsContextProvider>
              </WordsContextProvider>
            </FacesContextProvider>
          </DatesContextProvider>
        </CardsContextProvider>
      </HomeContextProvider>
    </HashRouter>
  </React.StrictMode>
)
