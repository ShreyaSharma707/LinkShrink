import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api.js";
import { queryClient } from "../main.jsx";
import {deleteShortUrl,updateShortUrl,} from "../api/shortUrl.api.js";

const BASE_URL = import.meta.env.VITE_PUBLIC_URL || import.meta.env.VITE_API_URL || window.location.origin;

const UserUrl = () => {

  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userUrls"],
        exact:true,
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, slug }) =>
        updateShortUrl(id, slug),
  
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["userUrls"],
        });
      
        setEditingId(null);
        setEditedSlug("");
    },
  });

  const [copiedId, setCopiedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedSlug, setEditedSlug] = useState("");

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this URL?"
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>

        <p className="text-lg font-medium">No URLs found</p>

        <p className="mt-1">
          You haven't created any shortened URLs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-7 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--line)] font-sans">
          <thead className="bg-[#f4f1eb]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Original URL
              </th>

              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Short URL
              </th>

              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Clicks
              </th>

              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--line)]">
            {[...urls.urls].reverse().map((url) => (
              <tr key={url._id} className="transition-colors hover:bg-[#fbf4e7]">
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-sm text-[var(--ink)]">
                    {url.full_url}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {editingId === url._id ? (
                    <input
                      type="text"
                      value={editedSlug}
                      onChange={(e) => setEditedSlug(e.target.value)}
                      className="input-field w-40 px-2 py-1 text-sm"
                    />
                  ) : (
                    <a
                      href={`${BASE_URL}/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--coral-dark)] hover:underline"
                    >
                      {`${BASE_URL.replace("http://", "")}/${url.short_url}`}
                    </a>
                  )}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-[var(--mint)] px-2 py-1 text-xs font-bold leading-5 text-[var(--mint-dark)]">
                    {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleCopy(`${BASE_URL}/${url.short_url}`, url._id)
                      }
                      className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-bold ${
                        copiedId === url._id
                          ? "bg-[var(--mint-dark)] text-white"
                          : "bg-[var(--ink)] text-white hover:bg-[#2b3947]"
                      }`}
                    >
                      {copiedId === url._id ? "Copied!" : "Copy"}
                    </button>                   
                    {editingId === url._id ? (
                      <>
                        <button
                          onClick={() =>
                            updateMutation.mutate({
                              id: url._id,
                              slug: editedSlug,
                            })
                          }
                          disabled={updateMutation.isPending}
                          className="rounded-md bg-[var(--mint-dark)] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#24594e] disabled:opacity-50"
                        >
                          {updateMutation.isPending ? "Saving..." : "Save"}
                        </button>                  
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedSlug("");
                          }}
                          className="rounded-md bg-[var(--ink-soft)] px-3 py-1.5 text-xs font-bold text-white hover:bg-[var(--ink)]"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(url._id);
                            setEditedSlug(url.short_url);
                          }}
                          className="rounded-md bg-[var(--sun)] px-3 py-1.5 text-xs font-bold text-[var(--ink)] hover:bg-[#e4b546]"
                        >
                          Edit
                        </button>                   
                        <button
                          onClick={() => handleDelete(url._id)}
                          disabled={deleteMutation.isPending}
                          className="rounded-md bg-[var(--coral-dark)] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#a8432f] disabled:opacity-50"
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;