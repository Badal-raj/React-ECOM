import { PageRouter } from "./routes";
import { ToastBox } from "./components/common/ToastBox";

function App() {
  return (
    <div>
      <PageRouter />
      <ToastBox />
    </div>
  );
}

export default App;
