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

  

### 9. Design `Step.jsx` component

- create component `Step.jsx` add add in `Home.jsx` page.

- ```jsx
  import React from 'react'
  import Header from '../components/Header'
  import Step from '../components/Step'
  
  const Home = () => {
    return (
      <div>
        <Header/>
        <Step />
      </div>
    )
  }
  
  export default Home
  
  ```

- design `Step.jsx`

- ```jsx
  import React from 'react'
  import { stepsData } from '../assets/assets'
  
  const Step = () => {
      return (
          <div className='flex flex-col justify-center items-center my-32'>
              <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
  
              <p className='text-lg text-gray-600 mb-8'>Transform words into stunning images</p>
  
              <div className='space-y-4 w-full max-w-3xl text-sm'>
                  {stepsData.map((item, index) => (
                      <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                          <img src={item.icon} alt='' />
                          <div>
                              <h2 className='text-xl font-medium'>{item.title}</h2>
                              <p className='text-gray-500'>{item.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )
  }
  
  export default Step
  ```





### 10 .Design `Description.jsx   `  component

- create it in component and add it in `Home.jsx`.

```jsx
import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

      <div className='flex flex-col  gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg'/>
        <div>
            <h2 className='text-3xl font-semibold max-w-lg mb-4'>
                Introducing the AI-Powered Text to Image Generator
            </h2>
            <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning or
            unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it 
            describe it, and watch it come to life instantly.
            </p>
            <p className='text-gray-600'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product
            visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. 
            Powered by advanced AI technology, the creative possibilities are limitless!
            </p>
        </div>
      </div>

    </div>
  )
}

export default Description
```





### 11. Design `testimonials.jsx` component

- create it in component and mounted it in `Home.jsx`.

```jsx
import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Testmonials = () => {
    return (
        <div className='flex flex-col items-center justify-center my-20 py-12'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
            <p className='text-gray-500 mb-12'>What Our Users Are Saying</p>

            <div className='flex flex-wrap gap-6'>
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                        <div className='flex flex-col items-center'>
                            <img src={testimonial.image} alt="" className='rounded-full w-14'/>
                            <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                            <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                            <div className='flex mb-4'>
                                {Array(testimonial.stars).fill().map((item, index)=>
                                    (
                                        <img key={index} src={assets.rating_star} alt=''/>
                                    ))
                                }
                            </div>
                            <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Testmonials
```





### 12.  Create `GenerateBtn.jsx` component

- Create `GenerateBtn.jsx` and mounted it in Home page

- ```jsx
  import React from 'react'
  import { assets } from '../assets/assets'
  
  const GenerateBtn = () => {
    return (
      <div className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl
        mt-4 font-semibold text-neutral-800 
        py-6 md:py-16'>See the magic. Try now</h1>
  
        <button className='inline-flex items-center gap-2
        px-12 py-3 rounded-full bg-black text-white 
        m-auto hover:scale-105 transition-all duration-500'
        >Generate Images
          <img src={assets.star_group} alt="" 
          className='h-6'/>
        </button>
      </div>
    )
  }
  
  export default GenerateBtn
  ```

  

### 13. Create `Footer.jsx` Component

- create `Footer.jsx` and mounted it in `App.jsx`,because it will show in all page

- ```jsx
  import React from 'react'
  import { assets } from '../assets/assets'
  
  const Footer = () => {
    return (
      <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} alt="" width={150}/>
  
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500
        max-sm:hidden'>Copyright @Greatfym.dev | All right reserved.</p>
  
        <div className='flex gap-2.5'>
          <img src={assets.facebook_icon} alt="" widtg={35}/>
          <img src={assets.twitter_icon} alt="" widtg={35}/>
          <img src={assets.instagram_icon} alt="" widtg={35}/>
        </div>
      </div>
    )
  }
  
  export default Footer
  ```



---



### 14. Create second page [Result page]

- create `const isImageLoaded` control input and button is display. a part of code below.

- ```jsx
  
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  {!isImageLoaded &&
          <div className='flex w-full max-w-xl bg-neutral-500 text-white
          text-sm p-0.5 mt-10 rounded-full'>
            <input type="text" placeholder='Describe what you want generate'
              className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
            <button type='submit'
              className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'
            >Generate</button>
          </div>}
  
  {isImageLoaded &&
          <div className='flex gap-2 flex-wrap justify-center text-white 
          text-sm p-0.5 mt-10 rounded-full'>
            <p className='bg-transparent border border-zinc-900
          text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
            <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
            >Download</a>
          </div>
        }
  ```

- create variable `const input` store input value , and add onchange function in input element, synchronous message for them. a part of code below.

```jsx
  //store the input messages
  const [input, setInput] = useState('');

<input type="text" 
            onChange={(e)=>{setInput(e.target.value)}}
            value={input}
            placeholder='Describe what you want generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
```

- complete result page onSubmitHandle function will complete after when create backend.

- ```jsx
  import React, { useState } from 'react'
  import { assets } from '../assets/assets'
  
  const Result = () => {
  
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    //store the input messages
    const [input, setInput] = useState('');
    const onSubmitHandler = async (e) => {
  
    }
  
    return (
      <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] items-center'>
        <div>
          <div className='relative'>
            <img src={image} alt="" className='max-w-sm rounded' />
            <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
              ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
          </div>
          <p className={loading ? '' : 'hidden'}>Loading...</p>
        </div>
  
        {!isImageLoaded &&
          <div className='flex w-full max-w-xl bg-neutral-500 text-white
          text-sm p-0.5 mt-10 rounded-full'>
            <input type="text"
              onChange={(e) => { setInput(e.target.value) }}
              value={input}
              placeholder='Describe what you want generate'
              className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
            <button type='submit'
              className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'
            >Generate</button>
          </div>}
  
  
        {isImageLoaded &&
          <div className='flex gap-2 flex-wrap justify-center text-white 
          text-sm p-0.5 mt-10 rounded-full'>
            <p onClick={() => { setIsImageLoaded(false) }}
              className='bg-transparent border border-zinc-900
           text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
            <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
            >Download</a>
          </div>
        }
      </form>
    )
  }
  
  export default Result
  ```

  
