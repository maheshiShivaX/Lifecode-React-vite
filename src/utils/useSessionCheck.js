import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const useSessionCheck = () => {
  useEffect(() => {
    const checkSession = () => {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) return; // no token, nothing to check

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // seconds

        if (decoded.exp && decoded.exp < currentTime) {
          // Token expired
          alert("Session Timeout! Please log in again.");

          // Clear storages
          localStorage.clear();
          sessionStorage.clear();

          // Redirect to login page
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Invalid token:", error);
        // Optionally clear and redirect if token is broken
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      }
    };

    // Run every 10 seconds
    const interval = setInterval(checkSession, 10000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
};

export default useSessionCheck;
