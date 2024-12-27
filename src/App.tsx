import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FormsList = lazy(() => import('./pages/FormsList'));
const CreateForm = lazy(() => import('./pages/CreateForm'));
const ViewForm = lazy(() => import('./pages/ViewForm'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forms" element={<FormsList />} />
          <Route path="/forms/create" element={<CreateForm />} />
          <Route path="/forms/:id" element={<ViewForm />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;