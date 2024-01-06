// pages/index.js
import { AuthProvider } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

export default function Home() {
  return (
    <AuthProvider>
      <div>
        <SignupForm />
        <LoginForm />
      </div>
    </AuthProvider>
  );
}
