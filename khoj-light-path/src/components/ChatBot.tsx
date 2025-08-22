import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Check if already initialized
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      // Define window.chatbase function proxy and queue
      window.chatbase = (...args: any) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args: any) => target(prop, ...args);
        },
      });

      // Function to load the embed script
      const onLoad = () => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "Tg9C-PRO7EuvtllW84mEG";
        script.setAttribute("domain", "www.chatbase.co");
        document.body.appendChild(script);
      };

      // Load immediately if page loaded, else wait for load event
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
        // Cleanup event listener on unmount
        return () => window.removeEventListener("load", onLoad);
      }
    }
  }, []);

  return null; // no UI needed; Chatbase injects the floating button
};

export default Chatbot;
