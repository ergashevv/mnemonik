import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HomeContextProvider } from "./context/home-context"
import { CardsContextProvider } from "./context/cards-context"
import { BrowserRouter } from "react-router-dom"
import { DatesContextProvider } from "./context/date-context"
import { NamesAndFacesContextProvider } from "./context/NamesAndFacesContext"
import { WordsContextProvider } from "./context/WordsContext"
import { FlashCardsContextProvider } from "./context/FlashCardsContext"

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeContextProvider>
        <CardsContextProvider>
          <DatesContextProvider>
            <NamesAndFacesContextProvider>
              <WordsContextProvider>
                <FlashCardsContextProvider>
                  <App />
                </FlashCardsContextProvider>
              </WordsContextProvider>
            </NamesAndFacesContextProvider>
          </DatesContextProvider>
        </CardsContextProvider>
      </HomeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
