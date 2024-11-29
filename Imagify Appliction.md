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

- 

