import { useEffect } from "react";

import axios from "axios";

const Success = () => {
  const userId = localStorage.getItem("@userId");
  console.log(userId);

  useEffect(() => {
    document.title = "Sucesso";
    const script = document.createElement("script");
    script.src = "https://cdn.eduzzcdn.com/sun/thankyou/thankyou.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const finishSubscription = async () => {
      await axios.post(
        `https://api.nobresfit.app/current_subscription/web/a6e0279f-7afa-48ff-b6a8-07ae0e6ecca1/${userId}`
      );
    };

    finishSubscription();
  }, []);
  return <div></div>;
};

export { Success };
