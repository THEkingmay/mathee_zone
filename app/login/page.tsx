'use client'

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black selection:bg-black selection:text-white">
      {/* Container หลัก จัดกลางจอ */}
      <div className="w-full max-w-sm px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Please sign in to manage your portfolio.
          </p>
        </div>

        {/* Login Button Group */}
        <div className="space-y-4">
          <button
            onClick={() => signIn('google',{callbackUrl : '/admin'})}
            className="group flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-black transition-all hover:bg-black hover:border-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {/* Google Icon (SVG) */}
            <svg 
              className="h-5 w-5 transition-transform group-hover:scale-110" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" 
                fill="currentColor" 
              />
              <path 
                d="M12.24 24.0008C15.4765 24.0008 18.2058 22.9382 20.19 21.1039L16.323 18.1056C15.2425 18.8375 13.8457 19.2965 12.24 19.2965C9.11388 19.2965 6.45946 17.1926 5.50705 14.3331H1.5166V17.4124C3.51864 21.3656 7.62548 24.0008 12.24 24.0008Z" 
                fill="currentColor" 
              />
              <path 
                d="M5.50705 14.3331C5.01397 12.864 5.01397 11.2618 5.50705 9.79268V6.71332H1.5166C-0.138543 9.9723 -0.138543 13.8817 1.5166 17.1407L5.50705 14.3331Z" 
                fill="currentColor" 
              />
              <path 
                d="M12.24 4.83227C13.9538 4.8096 15.6044 5.46603 16.8439 6.64998L20.2697 3.22419C18.0933 1.17188 15.2152 0.025492 12.24 0.00161406C7.62548 0.00161406 3.51864 2.63678 1.5166 6.59002L5.50705 9.66938C6.45332 6.82276 9.10651 4.83227 12.24 4.83227Z" 
                fill="currentColor" 
              />
            </svg>
            <span className="font-semibold">Sign in with Google</span>
          </button>
        </div>
        
        {/* Footer Text (Optional) */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Protected Area. For authorized personnel only.
        </p>
      </div>
    </div>
  )
}