import "shared/styles/globals.scss";
// import axios from "axios";
// import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  //   const fetcher = (...args) => axios(...args).then((res) => res.data);

  //   axios.defaults.baseURL =
  //     process.env.NODE_ENV === "production"
  //       ? process.env.HOST_DOMAIN
  //       : "http://localhost:3000";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    // <SWRConfig
    //   value={{ fetcher, revalidateOnFocus: false, dedupingInterval: 600000 }}
    // >
    <Component {...pageProps} />
    // </SWRConfig>
  );
}

export default MyApp;
