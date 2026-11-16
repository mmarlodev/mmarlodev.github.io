// Edit this file to personalize your portfolio. No coding knowledge needed:
// just change the text between the quotes.
window.PORTFOLIO = {
  name: "MarloDev",
  handle: "@jackson121265",
  role: "Roblox UI Designer",
  tagline: "I design clean, readable, and satisfying interfaces for Roblox experiences: event shops, HUDs, menu buttons, lobbies and everything in between.",
  available: true, // shows the "Open for commissions" badge

  // Optional. Add numbers you can back up, e.g. { value: "50+", label: "UIs delivered" }
  stats: [
    { value: "HUDs", label: "Buttons, currency, timers" },
    { value: "Shops", label: "Event & gamepass shops" },
    { value: "Menus", label: "Lobbies & matchmaking" }
  ],

  about: "I'm MarloDev, a UI designer focused on Roblox. I make bold, colorful interfaces that are easy to read at a glance: chunky buttons, punchy icons and themed shops that fit your game's style. Everything is built in Roblox Studio and scaled so it looks right on PC, mobile, tablet and console.",

  skills: [
    "Roblox Studio", "Figma", "Photopea / Photoshop", "UI Scaling (Scale vs Offset)",
    "UIGridLayout & UIListLayout", "TweenService Animations", "Mobile & Console Support",
    "Icon Design", "Event / Seasonal Themes"
  ],

  // Project cards. "mock" picks a built-in CSS preview:
  //   shop | inventory | hud | menu | settings | rewards
  // To use your own screenshot instead, put the file in assets/projects/
  // and set image: "assets/projects/your-file.png"
  projects: [
    { title: "Halloween Event Shop", category: "Shop", image: "assets/projects/halloween-shop.png", mock: "shop",
      description: "Limited-time Halloween shop with a seed banner, live countdown, rarity odds from 35% down to an ultra-rare 0.005%, and Candy currency packs.",
      tags: ["Event", "Shop", "Rarity odds", "Countdown"], link: "" },
    { title: "Simulator HUD", category: "HUD", image: "assets/projects/simulator-hud.png", mock: "hud",
      description: "Full in-game HUD: side menu buttons, Slow Mode toggle, strength and cash counters, friend boost, and event spawn timers.",
      tags: ["HUD", "Currency", "Timers", "Simulator"], link: "" },
    { title: "Side Menu Buttons", category: "HUD", image: "assets/projects/side-menu.png", mock: "menu",
      description: "Chunky, color-coded menu buttons with custom icons (Shop, Index, Event) and a matching toggle.",
      tags: ["Buttons", "Icons", "Toggle"], link: "" },
    { title: "Matchmaking Lobby", category: "Menu", image: "assets/projects/matchmaking.png", mock: "menu",
      description: "Clean matchmaking screen with 1v1, 2v2 and 3v3 queue cards, Most Popular tags and a party bar.",
      tags: ["Lobby", "PvP", "Party system"], link: "" }
  ],

  pricing: [
    { name: "Single Frame",  price: "1,500 R$",  desc: "One screen, e.g. a shop or a settings menu.",  features: ["Design + Studio build", "Scales to all devices", "2 revisions"] },
    { name: "Full Game UI",  price: "10,000 R$", desc: "A full UI kit for your experience.",           features: ["Up to 8 screens", "Tween animations", "Custom icons", "Unlimited revisions"], featured: true },
    { name: "Icons Pack",    price: "500 R$",    desc: "Matching icon set for your game.",             features: ["10 icons", "Transparent PNG", "Source files"] }
  ],
  pricingNote: "USD and PayPal also accepted. Prices are a starting point; DM me for a quote.",

  contact: {
    discord: "mmarlodev",
    roblox: "https://www.roblox.com/users/1933265410/profile",
    twitter: "",                  // e.g. "https://x.com/yourname"
    devforum: "",                 // e.g. "https://devforum.roblox.com/u/yourname"
    email: ""                     // e.g. "you@example.com"
  }
};
