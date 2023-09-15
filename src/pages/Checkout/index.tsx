// @ts-nocheck
import { useEffect } from "react";

import styled from "../../styles/checkout.module.scss";

const Checkout = () => {
  useEffect(() => {
    const load = function () {
      window.Eduzz.Checkout.init({
        contentId: 2026578,
        target: "elements",
        errorCover: true,
      });
    };

    if (document.readyState === "complete") {
      load();
    } else {
      window.addEventListener("load", load);
    }
  }, []);

  useEffect(() => {
    document.title = "Finalizar compra";
  }, []);

  return <div id="elements" className={styled.checkout}></div>;
};

export { Checkout };
