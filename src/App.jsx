import UserList from "./component/UserList"
import './index.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="h-screen bg-slate-100">
        <UserList />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
