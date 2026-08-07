import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">
      <h2 className="mb-8 text-2xl font-bold text-indigo-600">Studyora</h2>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-indigo-600">
          Dashboard
        </Link>

        <Link href="/dashboard/courses" className="block hover:text-indigo-600">
          Courses
        </Link>

        <Link
          href="/dashboard/assignments"
          className="block hover:text-indigo-600"
        >
          Assignments
        </Link>

        <Link
          href="/dashboard/settings"
          className="block hover:text-indigo-600"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
