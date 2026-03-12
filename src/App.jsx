import { useState } from 'react'
import FoundersNote from './components/FoundersNote'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-6 p-8"
      style={{ background: '#F5F0E5' }}
    >
      {/* Demo trigger */}
      <div className="text-center">
        <p className="font-sans text-sm tracking-[0.25em] uppercase text-yellow-700 mb-3">
          Habiba Salon · Ramadan Specials 2026
        </p>
        <h1 className="font-serif text-4xl font-black text-gray-900 mb-6">
          Founder's Note
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 rounded-lg bg-yellow-700 hover:bg-yellow-800
                     text-white font-sans font-bold tracking-wide text-sm
                     transition-colors shadow-lg"
        >
          Read the Founder's Note
        </button>
      </div>

      {/* 
        ─────────────────────────────────────────────────
        Reusable component — drop anywhere in your app.
        Pass signatureSrc="/path/to/signature.png" once
        you have a real image.
        ─────────────────────────────────────────────────
      */}
      <FoundersNote
        isOpen={open}
        onClose={() => setOpen(false)}
        /* signatureSrc="/signature.png" */
      />
    </main>
  )
}
