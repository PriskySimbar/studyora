import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPreview() {
  return (
    <Card className="w-105 rounded-2xl shadow-xl">
      <CardContent className="space-y-6 p-6">
        <h2 className="text-xl font-bold">Dashboard</h2>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Courses</p>
              <h3 className="text-2xl font-bold">6</h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Assignments</p>
              <h3 className="text-2xl font-bold">12</h3>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Upcoming</h3>

          <div className="rounded-lg border p-3">Database Project</div>

          <div className="mt-2 rounded-lg border p-3">AI Presentation</div>

          <div className="mt-2 rounded-lg border p-3">Next.js Assignment</div>
        </div>
      </CardContent>
    </Card>
  );
}
