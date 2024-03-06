import {Route, Routes} from "react-router-dom";
import MainLayout from "./main/MainLayout.tsx";
import App from "./App.tsx";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={ <App /> }>
        <Route index element={ <MainLayout /> } />
      </Route>
    </Routes>
  )
}
