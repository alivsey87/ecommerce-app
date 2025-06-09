# Advanced React E-Commerce Web App

---

## Table of Contents

1. [Project Setup](#project-setup)

2. [App Usage](#app-usage)

3. [Project Structure](#project-structure)

    - [Components](#component-auth0)
    - [Context](#context-task-context)
    - [Pages](#page-home)
    - [Types](#types)

### Project Setup

---

Clone repo and navigate to project:

```sh
git clone https://github.com/alivsey87/ecommerce-app.git
cd task-app
```

Install all dependencies needed for this project (React, React DOM, React Router, Redux/Redux Toolkit, React Query and Smastrom React Rating Bootstrap and Axios):

```sh
npm install
```

Run app:

```sh
npm run dev
```

---
---

### App Usage

---

App has a landing Home page asking user to Login. With the help of Auth0, user can login via Google or GitHub. User is directed to a dashboard that allows them to create tasks, remove tasks, edit each task and filter the tasks based on completion. User can also log out and be redirected back to the home page.

---
---

### Project Structure

---

I grouped the files by Components, Context, Pages and Types except for the App.tsx and main.tsx files. The context props are defined in App and passed to the context provider wrapping all the Routes. App is wrapped by the Auth0 Provider and everything wrapped by the Browser Router.

#### Component: Auth0

The first component `Auth0Provider.tsx` is where the Auth0 is configured to navigate the user after authentication. This wraps the entire app so that the authentication state is available to all components. The `AuthenticationGuard.tsx` uses the now available Auth0 context to protect whatever component/page (in my case, `Dashboard.tsx`) is trying to be accessed. If the user is authenticated, the page renders, if not, the user is redirected.

#### Component: Login

The `LoginButton.tsx` uses the Auth0 context to provide a way for the user to be authenticated and directed to the Dashboard upon successful authentication.

#### Component: Logout

Similarly, the `LogoutButton.tsx` uses the Auth0 context in directing the user back to the home page and changing to no longer being authenticated.

#### Component: Task Filter

The `TaskFilter.tsx` component contains the `filter` and `setFilter` props passed that filter the task list based on if they are completed or not. This component renders the buttons that render on the Dashboard that provide the user with the filter options.

#### Component: Task List

The `TaskList.tsx` component is what renders the actual list of tasks on the Dashboard. The component is passed the array of tasks, filter, updateTask and onTaskClick as props. Each task renders a checkbox that is handled by updateTask and the task itself is a button that is handled by onTaskClick to enable the user to check the details of the task and edit.

---

#### Context: Task Context

The global state for the tasks which is passed the TaskList type, addTask, deleteTask, clearTasks, updateTask functions as props.

---

#### Page: Home

The landing and "/" page welcoming the user and providing a Login/Logout button depending on if the user is authenticated or not.

#### Page: Dashboard

The `Dashboard.tsx` is the main component/page of the whole app. Once the user is authenticated, their dashboard is rendered with options to create/remove tasks and to filter the list of tasks. Many state variables are used here along with the Task context and Auth0 context. I employ 3 different modals here to display task details (`TaskDetailsModal.tsx`) and provide forms to create (`CreateTaskModal.tsx`) a task and edit (`EditTaskModal.tsx`) tasks.

#### Page: Callback

The redirect page if there is an error in authenticating user.

---

#### Types

The `tasks.ts` contains just two types: Task, which contains the id number, title string, optional description string and completed boolean, and the TaskList, which contains an array of Tasks, which is used to create the main Task Context.

[back to top](#knowledge-check-task-management-app-with-typescript)