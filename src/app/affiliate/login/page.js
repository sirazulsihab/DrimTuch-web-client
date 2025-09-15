"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AffiliateLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // ✅ status message

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message

    try {
      const res = await fetch("https://drimtuch-server.onrender.com/api/affiliate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Check paymentStatus
      if (data.paymentStatus === "pending") {
        setMessage("আপনার একাউন্ট এখনো এপ্রুভ হয়নি, দয়া করে অপেক্ষা করুন।");
        return;
      } else if (data.paymentStatus === "rejected") {
        setMessage("দুঃখিত, আপনার একাউন্ট রিজেক্ট করা হয়েছে।");
        return;
      }

      // Approved → Login successful
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ _id: data.userId }));
      router.push("/affiliate/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message || "কিছু ভুল হয়েছে, পুনরায় চেষ্টা করুন।");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 px-4">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Affiliate Login</h2>

          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 mt-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-black hover:text-yellow-400 transition"
          >
            Login
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-red-400">{message}</p>
          )}

          <p className="text-sm text-gray-300 mt-4 text-center">
            Don&apos;t have an account?{" "}
            <a
              href="/affiliate/signup"
              className="text-yellow-400 hover:text-yellow-200 font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}




// "use client";

// import Navbar from "@/components/Navbar";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AffiliateLogin() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("https://drimtuch-server.onrender.com/api/affiliate/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Login failed");
//       }

//       const data = await res.json();

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify({ _id: data.userId }));

//       // ✅ Redirect using router
//       router.push("/affiliate/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert(error.message || "Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 px-4">
//         <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full">
//           <h2 className="text-2xl font-bold mb-6 text-center">Affiliate Login</h2>

//           <label className="block mb-2 text-sm font-semibold">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label className="block mb-2 text-sm font-semibold">Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={handleLogin}
//             className="w-full py-3 mt-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-black hover:text-yellow-400 transition"
//           >
//             Login
//           </button>

//           <p className="text-sm text-gray-300 mt-4 text-center">
//             Don&apos;t have an account?{" "}
//             <a
//               href="/affiliate/signup"
//               className="text-yellow-400 hover:text-yellow-200 font-semibold"
//             >
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
