import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col text-white text-xl">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
