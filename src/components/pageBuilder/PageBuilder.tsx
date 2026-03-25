import type { PageBuilderPageData } from '@/fake-api/page-builder';
import { SectionRenderer } from './SectionRenderer';

export type PageBuilderContext = {
  mainCategory: string;
  subCategory?: string;
};

export function PageBuilder({
  pageData,
  pageContext,
}: {
  pageData: PageBuilderPageData;
  pageContext: PageBuilderContext;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {pageData.sections.map((section, idx) => (
        <SectionRenderer key={`${section.type}-${idx}`} section={section} pageContext={pageContext} />
      ))}
    </main>
  );
}

