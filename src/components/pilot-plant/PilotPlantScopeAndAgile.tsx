import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';
import { PilotPlantScopeIcon } from '@/components/pilot-plant/scopeIcons';
import { formatBoldText } from '@/lib/htmlText';
import { RichText } from '@/components/common/RichText';
type Props = Pick<
  PilotPlantPageData,
  | 'scopeLabel'
  | 'scopeTitleBlue'
  | 'scopeTitleBlack'
  | 'scopeGrid'
  | 'agileHtml'
  | 'agileEyebrow'
  | 'agileTitle'
  | 'agileBody'
  | 'agileHighlights'
>;

export default function PilotPlantScopeAndAgile({
  scopeLabel,
  scopeTitleBlue,
  scopeTitleBlack,
  scopeGrid,
  agileHtml,
  agileEyebrow,
  agileTitle,
  agileBody,
  agileHighlights,
}: Props) {
  return (
    <section className="bg-gray-50 pb-14 md:pb-20 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-[#009FE8] md:text-sm">
              {scopeTitleBlue || scopeLabel}
            </p>
            <h2 className="mt-3 text-[22px] font-bold leading-tight md:text-4xl lg:text-5xl text-black"
              
              dangerouslySetInnerHTML={{ __html: formatBoldText(scopeTitleBlack) }} />
         
            <div className="lg:mt-10 mt-6 grid grid-cols-2 gap-4 md:gap-5">
              {scopeGrid.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-[30px] bg-[#EDF0F1] p-5 "
                >
                  {item.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- CMS icons (SVG/PNG)
                    <img
                      src={item.iconUrl}
                      alt=""
                      className="h-10 w-10 object-contain"
                      aria-hidden
                    />
                  ) : (
                    <PilotPlantScopeIcon id={item.icon} />
                  )}
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-black md:text-[11px]">
                    {item.categoryLabel}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-black md:text-base">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[50px] bg-[#009FE8] p-8 text-white md:p-10 lg:p-12">
            
              <RichText
                html={agileHtml}
                className="text-white/95 [&_h6]:text-xs [&_h6]:font-semibold [&_h6]:uppercase [&_h6]:tracking-[0.2em] [&_h6]:text-white/90 [&_h3]:mt-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-white md:[&_h3]:text-3xl lg:[&_h3]:text-4xl [&_p]:mt-6 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/95 md:[&_p]:text-base [&_strong]:text-white [&_br]:leading-[1.9] [&_a]:underline [&_a:hover]:opacity-90"
              />
            
          </div>
        </div>
      </div>
    </section>
  );
}
