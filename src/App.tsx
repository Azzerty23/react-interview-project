import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import './App.css';
import UsersContainer from '@views/UsersContainer';
import UserContainer from '@views/UserContainer';
import PostsContainer from '@views/PostsContainer';
import MainLayout from '@layouts/MainLayout';
import PageNotFound from '@components/PageNotFound';
import HomeContainer from '@views/HomeContainer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Home route */}
            <Route index element={<HomeContainer />} />

            {/* Users routes */}
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/users/:userId" element={<UserContainer />} />

            {/* Posts routes */}
            <Route path="/posts" element={<PostsContainer />} />

            {/* 404 page */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
