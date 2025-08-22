import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Check if already initialized
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
     
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
        script.src = "";// add your url
        script.id = "";//add your script id
        script.setAttribute("", "");
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
