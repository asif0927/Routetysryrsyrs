import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/ROUTES";
import {  BasketContextProvider } from "./context/BasketContext";
const routes = createBrowserRouter(ROUTES);


function App() {
  return (
    <>
    <BasketContextProvider>
       <RouterProvider router={routes}/>
    </BasketContextProvider>
   </>
  );
}

export default App;
