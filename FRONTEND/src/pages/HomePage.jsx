import React from 'react'
import UrlForm from '../components/UrlForm.jsx'
const HomePage = () => {
  return (
    <main className="page-shell hero-grid px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="max-w-xl">
          <p className="eyebrow mb-5">Make every click count</p>
          <h1 className="max-w-lg text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
            Short links with a longer reach.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[var(--ink-soft)]">
            Turn unwieldy URLs into clear, memorable links that are easy to share and simple to track.
          </p>
          <div className="mt-8 flex items-center gap-3 font-sans text-sm text-[var(--ink-soft)]">
            <span className="h-2 w-2 rounded-full bg-[var(--coral)]" />
            No account needed to get started
          </div>
        </section>
        <section className="surface w-full max-w-xl justify-self-end p-6 sm:p-9">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Create a link</p>
              <h2 className="mt-2 text-2xl font-bold">Give your URL a better address.</h2>
            </div>
            <span className="rounded-full bg-[var(--mint)] px-3 py-1 font-sans text-xs font-bold text-[var(--mint-dark)]">Live</span>
          </div>
          <UrlForm />
        </section>
      </div>
    </main>
  )

}

export default HomePage
