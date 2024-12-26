export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent border-solid rounded-full animate-spin" />
        {/* Tekst */}
        <p className="mt-4 text-emerald-700 font-medium">Ładowanie...</p>
      </div>
    </div>
  );
}
