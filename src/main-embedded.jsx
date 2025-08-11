import React from "react";
import { createRoot } from "react-dom/client";
import AppEmbedded from "./AppEmbedded.jsx";

const el = document.getElementById("root");
if (!el) throw new Error("[EMBED] #root not found in index-embedded.html");

console.log("[EMBED] main-embedded mounted");
createRoot(el).render(<AppEmbedded data-app="embed" />);