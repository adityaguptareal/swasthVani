import { useState } from "react";
import supabase from "../supabaseClient";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // 🔹 Email Sign-Up
  const handleEmailSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      toast.error("Signed Up failed!" + error.message);
      console.error("Signup Error:", error.message);
      setEmail("");
      setPassword("");
    } else {
      setLoading(false);
      toast.success("Signed Up successfully");
      console.log("User Signed Up:", data);
      setEmail("");
      setPassword("");
    }
  };

  // // 🔹 Google Sign-In
  // const handleGoogleSignIn = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });

  //   if (error) console.error("Google Sign-In Error:", error.message);
  // };

  // // 🔹 Phone OTP Sign-Up
  // const handlePhoneSignup = async () => {
  //   const { error } = await supabase.auth.signInWithOtp({ phone });

  //   if (error) console.error("Phone Signup Error:", error.message);
  //   else console.log("OTP Sent!");
  // };

  return (
    <div className="flex items-center justify-center min-h-screen">
    
     <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>

        {/* Email Signup */}
        <div className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmailSignup}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Please wait ..." : "Sign Up with Email"}
          </motion.button>
        </div>

        <div className="relative flex items-center justify-center">
          <span className="absolute px-2 text-gray-500 bg-white">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign In with Google
        </motion.button>

        {/* Phone Signup */}
        <div className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="tel"
            placeholder="Phone Number"
            value={phone}
            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setPhone(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Sign Up with Phone
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
