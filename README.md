This is an e-commerce app made using a json file to store the data, node js for the backend and next js/react/typerscript for the frontend.

The app is currently one page but it has lots of functionality, it does the following

1. It shows the products
2. It allows the user to add and remove an item from a basket
3. It shows the total number of items in a basket
4. It shows the total cost of the basket
5. Display messages to say if the user was able to perform an action or not
6. Allows the user to search for a product using the search bar


**_INSTRUCTIONS FOR SETTING UP DEVELOPMENT MODE_**

1. Go into the backend/images folder and copy the full path name over to the "imageURL" field for each product into backend/data/products.json
   E.g: "imageURL": "/full_path_name/backend/images/desk_lamp.jpg" change this to the full path name on your system

2. Go into the /backend folder and run npm install
   Once installed run 'npm run dev' in the terminal

3. Go into the /frontend folder and run npm install
   Once installed run 'npm run dev' in the terminal

4. The go to localhost:3000 and you will see the main page with the products on it
