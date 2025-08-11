import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx';
import TaskPage from './pages/TaskPage.tsx';
import AuthLayout from './components/AuthLayout.tsx';
import App from './components/App'
import Login from './pages/Login.tsx';

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <App />,
    children: [
       
       {
            path: "/login",
            element: (
                <AuthLayout >
                    <Login />
                </AuthLayout>
            ),
        },  
        {
            path: "/home",
            element: (
                <AuthLayout authentication={true}>
                    <HomePage />
                </AuthLayout>
            ),
        },  
        {
            path: "/task/:id",
            element: (
                <AuthLayout authentication={true}>
                    <TaskPage />
                </AuthLayout>
            ),
        },    
       {
        path: "*",
        element: <HomePage/>, 
      },
    ],
},
]
)

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
