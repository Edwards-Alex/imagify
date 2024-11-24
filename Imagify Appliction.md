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

  

  

  