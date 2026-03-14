export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold">견적서 뷰어</h1>
      <p className="mt-2 text-zinc-500">
        견적서 ID: {id}
      </p>
      <p className="mt-1 text-zinc-400">
        견적서 내용이 여기에 표시됩니다.
      </p>
    </div>
  );
}
