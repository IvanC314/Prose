import Button from '../Shared_Components/Button';
import Login from './Login';

export default function LoginPage() {
  return (
    <div>
        <Button text="Home" targetPage='../'/>
        <Login/>
    </div>
  );
}
