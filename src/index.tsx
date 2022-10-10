import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HomeContextProvider } from "./context/home-context"
import { CardsContextProvider } from "./context/cards-context"
import { BrowserRouter } from "react-router-dom"
import { DatesContextProvider } from "./context/date-context"

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeContextProvider>
        <CardsContextProvider>
          <DatesContextProvider>
            <App />
          </DatesContextProvider>
        </CardsContextProvider>
      </HomeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
