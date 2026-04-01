import type { GreenPhotovoltaicProjectSectionData } from '@/lib/api/sustainability_layout_3';

export interface GreenPhotovoltaicProjectSectionProps {
  data: GreenPhotovoltaicProjectSectionData;
}

export default function GreenPhotovoltaicProjectSection({
  data,
}: GreenPhotovoltaicProjectSectionProps) {
  return (
    <>
      {data.htmlItems.map((html, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </>
  );
}
