import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <nav className="flex gap-4 mb-6">
        <Link href="/dashboard/customer-form">
          <a className="text-blue-500 hover:underline">Customer Form</a>
        </Link>
        <Link href="/dashboard/quotation">
          <a className="text-blue-500 hover:underline">Quotation</a>
        </Link>
        <Link href="/dashboard/history">
          <a className="text-blue-500 hover:underline">History</a>
        </Link>
      </nav>

      <p>Select a section to begin.</p>
    </div>
  );
}
