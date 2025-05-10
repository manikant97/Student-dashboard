import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddStudent from './components/AddStudent';
import Login from './components/Login';
import SignUp from './components/SignUp';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route component
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-student"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
