import { type FC } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useData } from './hooks/useData'
import type { Country, Participation } from './models/olympic.model'
import Header from './components/Header'
import Home from './pages/Home/Home'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
)

// Anti-pattern 9 — Plusieurs composants dans le même fichier — un fichier par composant recommandé.
// Composant non utilisé pour le moment, mais conservé pour la suite du projet.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Country: FC = () => {
  const { id } = useParams()
  const olympicsData = useData()

  // Anti-pattern 5 — console.log à retirer.
  console.log('Loading country with id:', id)
  // Anti-pattern 3 — Utilisation de `any` pour l'état ne permettant pas de bénéficier de TypeScript.
  const country: Country = olympicsData.find((c: Country) => c.id === Number(id))

  // Anti-pattern 5 — console.log à retirer.
  console.log('Country loaded:', country)

  const totalMedals = country.participations.reduce(
    (sum: number, p: Participation) => sum + p.medalsCount,
    0,
  )
  const totalAthletes = country.participations.reduce(
    (sum: number, p: Participation) => sum + p.athleteCount,
    0,
  )
  const totalParticipations = country.participations.length

  // Anti-pattern 10 — Préparation des données du graphique dans le composant — extraire dans une fonction ou un hook pour séparer UI et logique. https://react.dev/learn/thinking-in-react
  const evolutionData = {
    labels: country.participations.map((p: Participation) => p.year.toString()),
    datasets: [
      {
        label: 'Nombre de médailles',
        data: country.participations.map((p: Participation) => p.medalsCount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  }

  const evolutionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Header children={country.name}/>

        {/* Anti-pattern 8 — Cartes dupliquées avec Home — extraire en composant réutilisable (Indicator.tsx). */}
        <div className="mb-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
            <h3 className="text-xl font-semibold mb-2">Participations</h3>
            <p className="text-4xl font-bold text-blue-400">
              {totalParticipations}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
            <h3 className="text-xl font-semibold mb-2">Total médailles</h3>
            <p className="text-4xl font-bold text-yellow-400">{totalMedals}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Total athlètes</h3>
            <p className="text-4xl font-bold text-green-400">{totalAthletes}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Line data={evolutionData} options={evolutionOptions} />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>Données des 5 dernières éditions des Jeux Olympiques</p>
        </div>
      </div>
    </div>
  )
}

// Anti-pattern 11 — Routing dans App.tsx — idéalement : module dédié.
export const App: FC = () => {
  // Anti-pattern 5 — console.log à retirer.
  console.log('App rendered')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
