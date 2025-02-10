export const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) return;
  
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("ServiceWorker registered with scope:", registration.scope);
    } catch (err) {
      console.error("ServiceWorker registration failed:", err);
    }
  };