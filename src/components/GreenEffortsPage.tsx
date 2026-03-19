export interface GreenEffortsPageProps {
  data: {
    title: string;
    content: string;
    [key: string]: unknown;
  };
}

export default function GreenEffortsPage({ data }: GreenEffortsPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">{data.content}</p>
      </div>
    </main>
  );
}

