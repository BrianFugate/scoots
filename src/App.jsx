import React from 'react'
import Explore from './pages/Explore/Expore.jsx'
import Root from './components/Root/Root.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ViewPost from './pages/ViewPost/ViewPost.jsx';

// Create router with JSX Route elements
const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    <Route index element={ <Explore/> }/>
    <Route path='/ViewPost' element={ <ViewPost/> }/>
  </Route>
));


export default function App() {
  return (
    <RouterProvider router={appRouter}/>
  )
}