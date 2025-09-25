'use client'

import { useSupabase } from '@/hooks/useSupabase'
import { useState } from 'react'

export default function SupabaseTestPage() {
  const { supabase, isConnected, error } = useSupabase()
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/supabase/health')
      const data = await response.json()
      setTestResult(data)
    } catch (err) {
      setTestResult({
        status: 'error',
        message: 'Failed to test connection',
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  const testAdminConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/supabase/health', {
        method: 'POST'
      })
      const data = await response.json()
      setTestResult(data)
    } catch (err) {
      setTestResult({
        status: 'error',
        message: 'Failed to test admin connection',
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Supabase Connection Test
          </h1>

          {/* Connection Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Connection Status
            </h2>
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${
                isConnected === null ? 'bg-yellow-400' : 
                isConnected ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span className="text-lg">
                {isConnected === null ? 'Checking...' : 
                 isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            {error && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-body-small">{error}</p>
              </div>
            )}
          </div>

          {/* Test Buttons */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Test Connections
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={testConnection}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Testing...' : 'Test Client Connection'}
              </button>
              <button
                onClick={testAdminConnection}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Testing...' : 'Test Admin Connection'}
              </button>
            </div>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Test Results
              </h2>
              <div className={`p-4 rounded-md ${
                testResult.status === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <pre className="text-body-small overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Environment Variables Check */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Environment Variables (Client-side)
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  process.env.NEXT_PUBLIC_SUPABASE_URL ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-body-small">
                  NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-body-small">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-body-small text-gray-600">
                  SUPABASE_SERVICE_ROLE_KEY: Server-side only (use "Test Admin Connection" button)
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Setup Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-700 text-body-small">
              <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
              <li>Copy your project URL and API keys from the Supabase dashboard</li>
              <li>Create a <code className="bg-blue-100 px-1 rounded">.env.local</code> file in your project root</li>
              <li>Add the environment variables as shown in <code className="bg-blue-100 px-1 rounded">env.example</code></li>
              <li>Restart your development server</li>
              <li>Visit this page to test your connection</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}