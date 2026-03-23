import Image from 'next/image';

export type GovernanceDetailSectionData = {
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  centerText: string;
  buttonText: string;
  buttonHref: string;
  paragraphs: string[];
};

export default function GovernanceDetailSection({
  data,
}: {
  data: GovernanceDetailSectionData;
}) {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#009FE8] font-semibold text-sm md:text-base">
            {data.eyebrow}
          </div>

          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-[#009FE8] leading-tight">
            {data.title}
          </h2>

          <div className="mt-6">
            <Image
              src={data.imageSrc}
              alt={data.imageAlt}
              width={1600}
              height={800}
              className="w-full h-[300px] md:h-[420px] object-cover rounded-[2px]"
              priority
            />
          </div>

          <div className="mt-8 bg-[#EDF0F1] rounded-[50px] px-6 md:px-16 py-10">
            <p className="text-center text-gray-900 leading-relaxed max-w-4xl mx-auto">
              {data.centerText}
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href={data.buttonHref}
                className="inline-flex items-center justify-center bg-[#009FE8] text-white font-bold rounded-full px-12 py-4 hover:bg-[#0077B6] transition-colors"
              >
                {data.buttonText}
              </a>
            </div>
          </div>

          <div className="mt-10 text-gray-900 leading-relaxed max-w-5xl">
            {data.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

