export default function DashboardCourses() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <div className="space-y-4">
        {["Mathematics", "Physics", "Biology", "Chemistry", "English"].map(
          (course, i) => (
            <div
              key={i}
              className="p-5 bg-gray-800 rounded-xl border border-gray-700"
            >
              <h2 className="text-lg font-semibold">{course}</h2>
              <p className="text-gray-400 text-sm mt-1">Ongoing course</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
