import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Add custom APIs here if needed.
});
