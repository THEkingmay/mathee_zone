import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="flex max-w-md flex-col items-center gap-6">
        
        {/* Icon: Lock / Access Denied */}
        <div className="rounded-full bg-gray-100 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Access Denied
          </h1>
          <p className="text-gray-500">
            ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้านี้ <br />
            (Sorry, you don't have permission to access this area.)
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group mt-4 flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}