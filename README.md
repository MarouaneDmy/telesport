# TéléSport - Olympic Games History Dashboard

Interactive web application to visualize historical performance data of countries in the Olympic Games.

## 🚀 Features

- **Interactive Dashboard**: View medal counts by country with interactive charts
- **Country Details**: Explore detailed statistics for each participating country
- **Data Visualization**: Interactive charts powered by Chart.js
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Architecture**: Built with React, TypeScript, Tailwind CSS, and RTK Query for robust state management

## 📋 Prerequisites

- **Node.js** 22 LTS or higher
- **npm** (included with Node.js)

## 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/MarouaneDmy/telesport.git
cd telesport
```

Install dependencies:

```bash
npm install
```

## 🎯 Usage

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Production Build

Build the application for production:

```bash
npm run build
```

### Linting

Run the linter to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
p2-dfsjs/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Reusable UI components (Header, Indicator, Loader, ErrorMessage, Footer)
│   ├── hooks/              # Custom hooks (e.g., useData for mock data source)
│   ├── models/             # Strict TypeScript interfaces (Country, Participation)
│   ├── pages/              # Main application views (Home/, CountryDetails/, NotFound/)
│   ├── router/             # Centralized routing configuration (AppRouter.tsx)
│   ├── store/              # Redux store and RTK Query API configuration
│   ├── utils/              # Pure business logic functions (olympicStats.ts)
│   ├── App.tsx             # Root component + Chart.js global registration
│   ├── main.tsx            # Application entry point + Redux Provider
│   └── index.css           # Global styles and Tail
```

## 🔧 Tech Stack

- **React 19** - UI library with latest features
- **TypeScript** - Static type checking
- **Redux Toolkit & RTK Query** - Global state management and powerful data fetching/caching
- **Vite 5** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Chart.js** - Interactive data visualization
- **ESLint** - Code quality and consistency

## 📊 Data

The application currently uses mock data to simulate Olympic Games statistics. Thanks to the RTK Query abstraction layer, the architecture is fully prepared for a seamless transition to a real REST API backend without modifying any UI components.

## 🎨 Design

The application features:

- Clean, modern interface optimized for data visualization
- Responsive layout adapting to all screen sizes
- Interactive charts with hover effects
- Smooth navigation between pages

## 📚 Documentation

For more information on the technologies used:

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [RTK Query Documentation](https://redux-toolkit.js.org/)

---

**Built with React 19 + TypeScript + Vite + Tailwind CSS + Redux Toolkit**
