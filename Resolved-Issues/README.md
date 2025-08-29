How to get React.js up and running with Tailwind CSS?

Step 1: I made sure i have an IDE downloaded (In my case VSCode).

Step 2: Search on youtube for a guide.

Step 3: Following through with the guide.

Step 4: Started by using the command 'npm create vite@latest my-react-tailwind-app -- --template react' then cd into the new folder, for better visibility i ran the 'code .' command in the terminal to open a new directory.

Step 5: Then in the my-react-tailwind-app folder i ran the command 'npm install tailwindcss @tailwindcss/vite' to install the latest Tailwind CSS.

Step 6: Going to the vite.config.ts to add 'import tailwindcss from '@tailwindcss/vite'' to the top of the file and 'tailwindcss()' to the plugins.

Step 7: At the very top of the index.css in the src folder paste '@import "tailwindcss";'.

Step 8: Run the 'npm run dev' in the terminal to start your app.

Step 9: I then lastly tested whether it was working by putting in tag 'className='text-blue-500'' into tbe <h1 >Vite + React</h1> line of the App.jsx and it the text did turn blue.

This concludes my little guide to setting up a basic React.js and Tailwind CSS
