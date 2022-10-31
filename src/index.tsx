import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CardsContextProvider } from './context/cards-context'
import { DatesContextProvider } from './context/date-context'
import { FlashCardsContextProvider } from './context/FlashCardsContext'
import { HomeContextProvider } from './context/home-context'
import { FacesContextProvider } from './context/FacesContext'
import { WordsContextProvider } from './context/WordsContext'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>
)
