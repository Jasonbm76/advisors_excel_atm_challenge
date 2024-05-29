## Questions

### Please provide instructions on how to run your project in a bulleted list below.

#### I had to install postgres locally and seed the db as I was unable to connect to docker so you'll need to make sure that postgres is running locally with the following info:

`user: 'my_user',
host: 'localhost',
database: 'challenge',
password: 'root',
port: 5432,`

- Clone the repo
- Run `yarn` to install the node_modules
- Run `yarn dev` to start the express server and the project
- Navigate to `http://localhost:3000/app` to view it

If you have any trouble feel free to email me at jasonbm76@gmail.com or call/text `832-714-1973`

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

- I believe that I accomplished every one of the project requirements.
- I made myself a checklist on Google Docs and checked off each requirement as I met them (https://docs.google.com/document/d/1VA0aFOTbGNk4WpiI3vTg-tZsDnPZ1iHn_x1bi5nB-8k/edit?usp=sharing)

### If you were to continue building this out, what would you like to add next?

- If I had more time I would probably not have gone the route of using useContext for handling the data and would have used React Query but that felt like overkill for this
- I would find a way to truly enforce the daily limit as that can be reset by refreshing the browser. Probably wouldn't be that difficult to add to the db and check it.

### If you have any other comments or info you'd like the reviewers to know, please add them below.

- My only real issue was in getting this stood up. I got docker running and I'm guessing postgres was running in it but I couldn't figure out how to connect to it.
