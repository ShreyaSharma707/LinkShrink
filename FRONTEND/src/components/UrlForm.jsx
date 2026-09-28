import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api.js'
import { useSelector } from 'react-redux'
import { Link } from "@tanstack/react-router";
import { queryClient } from '../main.jsx'

const UrlForm = () => {
  
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    try{
      const generatedUrl = await createShortUrl(url,customSlug)
      setShortUrl(generatedUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError(null)
    }catch(err){
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="space-y-5 font-sans">
        <div>
          <label htmlFor="url" className="mb-2 block text-sm font-bold text-[var(--ink)]">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="input-field px-4 py-3"
          />
        </div>
        {isAuthenticated && (
          <div>
            <label htmlFor="customSlug" className="mb-2 block text-sm font-bold text-[var(--ink)]">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
              className="input-field px-4 py-3"
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          type="submit"
          className="primary-button w-full px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
        >Shorten URL
        </button>
        

        {!isAuthenticated && (
          <div>
            <Link to="/auth">
              <button className="secondary-button w-full px-4 py-3">
                Login / Register
              </button>
            </Link>
          </div>
        )}
         {error && (
          <div className="status-error rounded-md p-3 text-sm">
            {error}
          </div>
        )}
        {shortUrl && (
          <div className="border-t border-[var(--line)] pt-5">
            <h2 className="mb-2 text-lg font-bold text-[var(--ink)]">Your shortened URL:</h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="input-field min-w-0 flex-1 rounded-r-none bg-[#f4f1eb] px-3 py-2"
              />
               <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                  copied 
                    ? 'bg-[var(--mint-dark)] text-white' 
                    : 'bg-[var(--ink)] text-white hover:bg-[#2b3947]'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default UrlForm