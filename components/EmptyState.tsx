export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center text-gray-600 p-6 border rounded-xl bg-gray-100">
      {message}
    </div>
  );
}
