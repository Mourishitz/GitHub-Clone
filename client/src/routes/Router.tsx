import Home from '../pages/Home'
import User from '../pages/User'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route 
          element={<User />}
          path='/user/:username'
        />
      </Routes>
    </BrowserRouter>
  )
}