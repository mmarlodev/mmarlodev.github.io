// Edit this file to personalize your portfolio. No coding knowledge needed:
// just change the text between the quotes.
window.PORTFOLIO = {
  name: "Your Name",
  handle: "@YourRobloxUser",
  role: "Roblox UI Designer",
  tagline: "I design clean, readable, and satisfying interfaces for Roblox experiences: shops, inventories, HUDs, menus and everything in between.",
  available: true, // shows the "Open for commissions" badge

  stats: [
    { value: "50+", label: "UIs delivered" },
    { value: "20M+", label: "Visits on games I've worked on" },
    { value: "3 yrs", label: "In Roblox Studio" }
  ],

  about: "I'm a UI/UX designer focused on Roblox. I design in Figma or Photopea, then build everything natively in Roblox Studio with proper scaling, UIAspectRatioConstraints, and smooth TweenService animations, so it looks right on PC, mobile, tablet and console.",

  skills: [
    "Roblox Studio", "Figma", "Photopea / Photoshop", "UI Scaling (Scale vs Offset)",
    "UIGridLayout & UIListLayout", "TweenService Animations", "Mobile & Console Support",
    "Icon Design", "Luau UI Scripting", "Plugin: AutoScale Lite"
  ],

  // Project cards. "mock" picks a built-in CSS preview:
  //   shop | inventory | hud | menu | settings | rewards
  // To use your own screenshot instead, put the file in assets/projects/
  // and set image: "assets/projects/your-file.png"
  projects: [
    { title: "Simulator Shop",       category: "Shop",      mock: "shop",      image: "", description: "Gamepass and currency shop with animated buttons and a featured-item banner.", tags: ["Figma", "Studio", "Tweens"], link: "" },
    { title: "RPG Inventory",        category: "Inventory", mock: "inventory", image: "", description: "Grid inventory with rarity colors, equip states and item tooltips.",            tags: ["UIGridLayout", "Rarity system"], link: "" },
    { title: "Combat HUD",           category: "HUD",       mock: "hud",       image: "", description: "Health, stamina and ability cooldowns, readable on small mobile screens.",      tags: ["Mobile", "Cooldowns"], link: "" },
    { title: "Main Menu",            category: "Menu",      mock: "menu",      image: "", description: "Title screen with play, settings and a blurred animated backdrop.",              tags: ["Menu", "Blur"], link: "" },
    { title: "Settings Panel",       category: "Menu",      mock: "settings",  image: "", description: "Toggles, sliders and keybinds that work on PC, mobile and console.",              tags: ["Console", "Accessibility"], link: "" },
    { title: "Daily Rewards",        category: "Shop",      mock: "rewards",   image: "", description: "7-day streak reward calendar to keep players coming back.",                    tags: ["Retention", "Animation"], link: "" }
  ],

  pricing: [
    { name: "Single Frame",  price: "1,500 R$",  desc: "One screen, e.g. a shop or a settings menu.",  features: ["Design + Studio build", "Scales to all devices", "2 revisions"] },
    { name: "Full Game UI",  price: "10,000 R$", desc: "A full UI kit for your experience.",           features: ["Up to 8 screens", "Tween animations", "Custom icons", "Unlimited revisions"], featured: true },
    { name: "Icons Pack",    price: "500 R$",    desc: "Matching icon set for your game.",             features: ["10 icons", "Transparent PNG", "Source files"] }
  ],
  pricingNote: "USD and PayPal also accepted. Prices are a starting point; DM me for a quote.",

  contact: {
    discord: "yourdiscord",
    roblox: "https://www.roblox.com/users/0/profile",
    twitter: "",                  // e.g. "https://x.com/yourname"
    devforum: "",                 // e.g. "https://devforum.roblox.com/u/yourname"
    email: ""                     // e.g. "you@example.com"
  }
};
