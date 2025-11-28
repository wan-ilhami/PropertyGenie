# 🏡 Property Genie Marketplace

A modern real estate search platform built with Next.js and Material-UI.

## 📋 Overview

Property Genie is a responsive real estate marketplace featuring property search, advanced filtering, sorting, and modern UI design.

## 🚀 Features

- ✅ Location-based search (city/state)
- ✅ Advanced filters (price range, property type)
- ✅ Multiple sorting options (price, date)
- ✅ Fully responsive design (mobile/tablet/desktop)
- ✅ Modern UI with gradients and smooth animations
- ✅ Client-side filtering for fast performance

## 💻 Tech Stack

- **Framework:** Next.js 13+ (Page Router)
- **UI Library:** Material-UI (MUI) v5
- **Language:** JavaScript (ES6+)
- **HTTP Client:** Axios
- **State Management:** React Hooks

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/property-genie.git
cd property-genie

# 2. Install dependencies
npm install

# 3. Create .env.local file and add:
NEXT_PUBLIC_API_URL=https://agents.propertygenie.com.my/.netlify/functions/properties-mock

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

## 📁 Project Structure

```
property-genie/
├── pages/
│   ├── _app.js                    # MUI theme configuration
│   └── index.js                   # Main search page
├── components/
│   ├── Layouts/
│   │   └── MainLayout.js          # Header/Footer layout
│   ├── Search/
│   │   ├── SearchBar.js           # Location search
│   │   └── FilterPanel.js         # Filters sidebar
│   ├── Listings/
│   │   ├── PropertyList.js        # Property grid
│   │   ├── PropertyCard.js        # Property card
│   │   └── Pagination.js          # Page navigation
│   └── Hooks/
│       └── usePropertySearch.js   # Search logic hook
├── .env.local                     # Environment variables
└── package.json
```

## ⚙️ Configuration

### Change Theme Color
Edit `pages/_app.js`:
```javascript
palette: {
  primary: { main: '#0056b3' },  // Change this color
}
```

### Change Items Per Page
Edit `components/Hooks/usePropertySearch.js`:
```javascript
const perPage = 9;  // Modify this number
```

### Add Property Types
Edit `components/Search/FilterPanel.js`:
```javascript
const PROPERTY_TYPES = ['apartment', 'house', 'condo', ...];
```

## 🏃 Running the App

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start
```

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | `npm run dev -- -p 3001` |
| Clear cache | `rm -rf .next && npm run dev` |
| API not working | Check `.env.local` has correct `NEXT_PUBLIC_API_URL` |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m "Add NewFeature"`
4. Push: `git push origin feature/NewFeature`
5. Open Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 📧 Contact

- **Project:** [https://github.com/your-username/property-genie](https://github.com/your-username/property-genie)
- **Issues:** [https://github.com/your-username/property-genie/issues](https://github.com/your-username/property-genie/issues)

---

Built with ❤️ using Next.js & Material-UI