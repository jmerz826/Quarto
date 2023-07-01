import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Secret } from "./components/Secret";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="secret" Component={Secret} />
      </Routes>
    </>
  );
}

export default App;
