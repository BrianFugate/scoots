import React, { lazy } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
const Explore = lazy(() => import('./pages/Explore/Expore.jsx'))
const Root = lazy(() => import('./components/Root/Root.jsx'))
const ViewPost = lazy(() => import('./pages/ViewPost/ViewPost.jsx'))
const RootBoundary = lazy(() => import('./error-routes/RootBoundry.jsx'))
const ExploreBoundry = lazy(() => import('./error-routes/ExploreBoundry.jsx'))
const ViewPostBoundry = lazy(() => import('./error-routes/ViewPostBoundry.jsx'))

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
    <React.Suspense fallback={<div>Loading</div>}>
      <RouterProvider router={appRouter}/>
    </React.Suspense>
  )
}