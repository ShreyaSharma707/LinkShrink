import React from 'react'
import UrlForm from '../components/UrlForm.jsx'
import UserUrl from '../components/UserUrl.jsx'

const DashboardPage = () => {
  return (
    <div className="page-shell px-5 py-10 sm:px-8">
    <div className="surface mx-auto w-full max-w-5xl p-6 sm:p-9">
      <div className="mb-8 border-b border-[var(--line)] pb-7">
        <p className="eyebrow">Your workspace</p>
        <h1 className="mt-2 text-4xl font-bold">Dashboard</h1>
        <p className="mt-2 text-[var(--ink-soft)]">Manage your links, slugs, and click activity.</p>
      </div>
      <UrlForm/>
      <UserUrl/>
    </div>
  </div>
  )
}

export default DashboardPage