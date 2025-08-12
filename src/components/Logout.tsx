import { logoutUser } from "@/BackendApi/authApi";
import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";



export default function LogOut()
{
    
 const dispatch = useDispatch();
  //  const navigate = useNavigate();
  
  
    // Memoized logout handler to prevent recreating on every render
    const handleLogout = async () => {
      try {
        await logoutUser();
        dispatch(logout());
        //setDropdown(false);
      } catch (err) {
        console.error(err, 'error logging out');
        // Show user feedback for failed logout
        alert('Failed to log out. Please try again.');
      }
    };

return (
  
        <Button
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
          onClick={handleLogout}
        >
          Logout
        </Button>
)
}