<p align="center">
  <img src="public/images/umbrella_logo.png" width="120" alt="Umbrella Logo" />
</p>

<h1 align="center">Umbrella Weather</h1>

---

## 🌤 Overview

Umbrella Weather is a small but well-structured weather application.  
It focuses on **clarity, architecture, predictable data flow, and clean UI** rather than visual complexity.

You can:

- search for a city
- validate it through OpenWeather API
- display current conditions and temperature with a chart
- view a detailed modal with an hourly chart
- save cities locally
- refresh or delete entries

No server-side rendering — the app is fully client-side by design to avoid exposing API keys.

---

## 🧱 Tech Stack

**Core**

- Next.js **16.0.3**
- React **19.2.0**
- TypeScript **5**
- Redux Toolkit **2.10.1**
- RTK Query (built into RTK)
- SCSS Modules

**UI**

- MUI **7.3.5**
- Recharts **3.4.1**
- react-hot-toast **2.6.0**

**Testing**

- Jest **30.x**
- jest-environment-jsdom
- React Testing Library **16.x**
- next-router-mock
- whatwg-fetch

**(!) Don't forget to add your API-key in '.env.local'**
NEXT_PUBLIC_OPENWEATHER_API_KEY=...

---
