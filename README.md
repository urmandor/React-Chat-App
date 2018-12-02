# Chat Application

### Installation:

- Run `npm install`
- Semantic UI installation will start immediately, select automatic and the default path i.e './semantic' from the command line options
- Once done, navigate to './sematic' and run `gulp build` to build the dist files.

#### Start:

- Run `npm start` to start

#### Description:

- I have used the semantic-ui framework for the ui part as in my opinion it is very easy to get up and running specially with React.
- The project is structured as follows,
  - Every Page has its own folder, in our case `LoginPage` and `MainPage`
  - All other components are inside the `_components` folder
  - Main layout of the application is define inside `MainLayout` component
    - All of the secured content resides inside it
  - I have used the `PrivateRoute` component to show/hide routes, depending on whether user is authenticated or not

#### Flow:

- Login with username: `admin`, password: `admin`
- You are redirected to the main chat dashboard
- You can add a contact from the contacts menu on the left side
- After adding, click on it to start a conversation

#### Task:

- I have spent around 12-13 hours on this app
- If I had more time,
  - I definitely would have written test cases
  - folder structure could have been better
- I would atleast need to handle the replies part and incorporate firebase sdk for push notifications inorder to make it production ready
