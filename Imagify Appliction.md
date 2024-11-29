## Imagify Appliction

### 1. Description

an application  Text to Image Generator full stack tutorial , use React ，js and mongoDB.

### 2. Start project

- create the react project use vite package.
- enter command in client folder`npm create vite@latest`.
- install the dependencies for that project `npm install`.
- start this project `npm run dev`.
- clear base ui and message.

### 3. Create folder structure 

- ![folder structure](https://www.helloimg.com/i/2024/11/20/673d9d10d78f6.png)

- install tailwind css  for React`npm install -D tailwindcss postcss autoprefixer` `npx tailwindcss init -p `

- Add the paths to all of your template files in your `tailwind.config.js` file

- ```js
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

- Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

- ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```




### 4. Create react router

- install `npm install react-router-dom`



### 5. use Google font in our project

- search outfit font in browser

- click button `get font`
- click button `get embed code`
- click `import` option
- copy this import link  and paste it at vscode `index.css`file at the top
- then add the font at all elements

- ```css
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  *{
      font-family: Outfit;
  }
  ```





### 6. Building the Home page

- create page `Home`,`BuyCredit`and`Result` and mounted them at `App.jsx`

- ```jsx
  import React from 'react'
  import Home from './pages/Home'
  import BuyCredit from './pages/BuyCredit'
  import Result from './pages/Result'
  
  const App = () => {
    return (
        <div>
          <Home />
          <Result />
          <BuyCredit />
        </div>
    )
  }
  
  export default App
  ```

- set up the `react-router`

- import `{BrowserRouter}`from `react-router-dom`  this have support of bowser router in the complete app component.

- ```jsx
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter } from 'react-router-dom'
  import './index.css'
  import App from './App.jsx'
  
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
  ```

- import `{Routes, Route}` from `react-router-dom` import this can declare use this tag(<Routes>,<Route>)

- ```jsx
  import React from 'react'
  import Home from './pages/Home'
  import BuyCredit from './pages/BuyCredit'
  import Result from './pages/Result'
  import {Routes, Route} from 'react-router-dom'
  
  const App = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/buy' element={<BuyCredit />} />
        </Routes>
      </div>
    )
  }
  
  export default App
  ```

- add navigation bar at `App.jsx` in all pages.

- create navigation component in components folder.

- ```jsx
  const App = () => {
    return (
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
        {/* add Navbar at header */}   
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/buy' element={<BuyCredit />} />
        </Routes>
      </div>
    )
  }
  ```



### 7. Design `Navbar.jsx`

```jsx
import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-4'>
      <Link to='/'>
        <img src={assets.logo} alt="logo" className='w-28 sm:w-32 lg:w-40' />
      </Link>
      <div>
        {
          user ? 
          <div className='flex items-center gap-2 sm:gap-3'>
            <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3  rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-5' src={assets.credit_star} alt="credit_star" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : 50</p>
            </button>
            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, GreateUser</p>
            <div className='relative group'>
              <img className='w-10 drop-shadow' src={assets.profile_icon} alt="profile_icon" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                  <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
          :
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
            <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
```

- change `const [user, setUser] const navigate`  add it in the context.
- store our states and functions in one place.

- create `AppContext.jsx` and createContext

- ```jsx
  import { createContext, useState } from "react";
  
  export const AppContext = createContext();
  
  const AppContextProvider = (props) => {
      const [user, setUser] = useState(null);
  
      const value = {
          user, setUser
      }
  
      return (
          <AppContext.Provider value={value}>
              {props.children}
          </AppContext.Provider>
      )
  }
  
  export default AppContextProvider;
  ```

- import `AppContextProvider` in`main.jsx` 

- ```jsx
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter } from 'react-router-dom'
  import './index.css'
  import App from './App.jsx'
  import AppContextProvider from './context/AppContext.jsx'
  
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>,
  )
  ```

- then  you can use all AppContext's variable you defined in `AppContext.jsx`

- ```jsx
  import React, { useContext } /*, { useState } */ from 'react'
  import { assets } from '../assets/assets.js'
  import { Link, useNavigate } from 'react-router-dom'
  import { AppContext } from '../context/AppContext.jsx';
  
  const Navbar = () => {
    //change use user from AppContext.
    const { user } = useContext(AppContext);
    // const [user, setUser] = useState(null);
  
    const navigate = useNavigate();
  
    return (
      <div className='flex items-center justify-between py-4'>
        <Link to='/'>
          <img src={assets.logo} alt="logo" className='w-28 sm:w-32 lg:w-40' />
        </Link>
        <div>
          {
            user ?
              <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3  rounded-full hover:scale-105 transition-all duration-700'>
                  <img className='w-5' src={assets.credit_star} alt="credit_star" />
                  <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : 50</p>
                </button>
                <p className='text-gray-600 max-sm:hidden pl-4'>Hi, GreateUser</p>
                <div className='relative group'>
                  <img className='w-10 drop-shadow' src={assets.profile_icon} alt="profile_icon" />
                  <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                      <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                    </ul>
                  </div>
                </div>
              </div>
              :
              <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
                <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
              </div>
          }
        </div>
      </div>
    )
  }
  
  export default Navbar
  ```





### 8. Design `Header.jsx` component

- create `Header.jsx` at components. and add it in `Home.jsx`

- ```jsx
  import React from 'react'
  import Header from '../components/Header'
  
  const Home = () => {
    return (
      <div>
        <Header/>
      </div>
    )
  }
  
  export default Home
  ```

- design `Header.jsx`

- ```jsx
  import React from 'react'
  import { assets } from '../assets/assets.js'
  
  const Header = () => {
      return (
          <div className='flex flex-col justify-center items-center text-center my-20'>
              <div className='text-stone-500 inline-flex text-center gap-2 bg-white py-1 px-6 border-neutral-500 rounded-full border'>
                  <p>Best text to image generator</p>
                  <img src={assets.star_icon} alt="start_icon" />
              </div>
  
              <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'>image</span>, in seconds.</h1>
  
              <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</p>
  
              <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>Generate Images
                  <img className='h-6' src={assets.star_group} alt="star_group" />
              </button>
  
              <div className='flex flex-wrap justify-center gap-3  mx-auto mt-16'>
                  {Array(6).fill('').map((item, index) => (
                      <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} alt='' key={index} width={70} />
                  ))}
              </div>
  
              <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
  
          </div>
      )
  }
  
  export default Header
  ```

  