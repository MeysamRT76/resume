import { useEffect } from "react";

export default function HistoryHandler() {

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  return null;
}
