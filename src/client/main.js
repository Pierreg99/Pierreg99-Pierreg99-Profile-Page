import { initLanguage } from "./i18n.js";
import { initNavigation } from "./navigation.js";
import { initExplorers } from "./explorer.js";
import { initMotion } from "./motion.js";

document.documentElement.classList.add("js");
initLanguage();
initNavigation();
initExplorers();
initMotion();
