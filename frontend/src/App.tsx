import "./index.css";
import "./styles/custom.css";

import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes";
import ReduxProvider from "./services/provider/ReduxProvider";
import {Toaster} from 'sonner'

const App = () => {
  return (
    <div>
      <ReduxProvider>
        <Toaster richColors position="top-right" closeButton/>
        <RouterProvider router={Routes} />
      </ReduxProvider>
    </div>
  );
};

export default App;
