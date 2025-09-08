// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

// export default function ClientProgress() {
//   const pathname = usePathname();

//   useEffect(() => {
//     NProgress.start();   // route change start
//     NProgress.done();    // route change complete

//     return () => NProgress.done(); // cleanup
//   }, [pathname]);

//   return null; // কোনো DOM render করবে না
// }

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// NProgress configuration
NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export default function ClientProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();   // route change start
    NProgress.done();    // route change complete

    return () => NProgress.done(); // cleanup if component unmounts
  }, [pathname]);

  return null; // কোনো DOM render হবে না
}
