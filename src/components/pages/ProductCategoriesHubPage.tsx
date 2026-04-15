import { Fragment } from 'react';
import type { PageBuilderPageData } from '@/fake-api/page-builder';
import type { PageBuilderContext } from '@/components/pageBuilder/PageBuilder';
import { SectionRenderer } from '@/components/pageBuilder/SectionRenderer';
import VideoBanner from '@/components/home/VideoBanner';

/**
 * Product hub (`layout: product_categories`) — optional CMS `meta.video_url` is rendered
 * below the category grid (`categoryShowcase`) and above CTA / newsletter.
 */
export function ProductCategoriesHubPage({
  pageData,
  pageContext,
  videoUrl,
}: {
  pageData: PageBuilderPageData;
  pageContext: PageBuilderContext;
  videoUrl?: string | null;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {pageData.sections.map((section, idx) => (
        <Fragment key={`${section.type}-${idx}`}>
          <SectionRenderer section={section} pageContext={pageContext} />
          {videoUrl && section.type === 'categoryShowcase' ? (
            <div className="">
              <div className="pb-10 md:pb-12 lg:pb-24">
                  <VideoBanner videoOnly videoUrl={videoUrl} />
              </div>
            </div>
            
          ) : null}
        </Fragment>
      ))}
    </main>
  );
}
