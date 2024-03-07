import "./styles/main.scss";
import HomePage from "./homepage/HomePage.tsx";

export default function MainLayout() {

  return (
    <div className="container-noise">
      <div className="noise" />
      <div className="overlay" />
      <HomePage />
    </div>
  )
}
