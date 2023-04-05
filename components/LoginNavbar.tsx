import router from "next/router";

interface LoginNavbarProps {
  isRegistration: boolean;
}

// Takes in a bool as props
// If register is true, show navbar for registration
// Else, show navbar for Log in
const LoginNavbar = ({ isRegistration }: LoginNavbarProps) => {
  return (
    <div className="bg-navbar flex justify-between items-center w-full py-4 px-12">
      <h2 className="text-lg tracking-[.5em] font-semibold">verse</h2>
      <button
        className="bg-black rounded-lg text-white px-8 py-2"
        onClick={() =>
          isRegistration ? router.push("/login") : router.push("/signup")
        }
      >
        {isRegistration ? "Login" : "Signup"}
      </button>
    </div>
  );
};

export default LoginNavbar;
