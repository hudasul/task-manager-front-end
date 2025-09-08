import { useNavigate , Link} from "react-router";
const Home = () => {
  return (
  <div>
    <h1>Task Manager</h1>
    <Link to={'/login'}>Login</Link>
    <Link to={'/signup'}>Sign Up</Link>

  </div>
  )
};

export default Home;
