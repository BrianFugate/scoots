import React from 'react'
import Explore from './pages/Explore/Expore.jsx'
import Root from './components/Root/Root.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ViewPost from './pages/ViewPost/ViewPost.jsx';
import RootBoundary from './error-routes/RootBoundry.jsx';
import ExploreBoundry from './error-routes/ExploreBoundry.jsx';
import ViewPostBoundry from './error-routes/ViewPostBoundry.jsx';

// Create router with JSX Route elements
const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> } errorElement={ <RootBoundary/> }>
    <Route index element={ <Explore/> } errorElement={ <ExploreBoundry/> }/>
    <Route path='/ViewPost' element={ <ViewPost/> } errorElement={ <ViewPostBoundry/> }>
      <Route path=':id' element={ <ViewPost/> }/>
    </Route>
  </Route>
));


export default function App() {
  return (
    <RouterProvider router={appRouter}/>
  )
}