import { Suspense } from "react";
import { Global } from "@emotion/react";
import { globalStyles } from "./common/styles/globalStyles";
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import Loader from "./layouts/Loader/Loader";

function App() {
  const routing = useRoutes(ThemeRoutes);
  return (
    <>
      <Global styles={globalStyles} />
      <Suspense fallback={<Loader />}>{routing}</Suspense>
    </>
  );
}

export default App;
