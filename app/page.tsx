import { Hero } from "@/components/Hero";
import { PushExamplesSection } from "@/components/PushExamplesSection";
import { AnalyticsSection } from "@/components/AnalyticsSection";
import { PlatformsSection } from "@/components/PlatformsSection";
import { DifferentiationSection } from "@/components/DifferentiationSection";
import { TeamSection } from "@/components/TeamSection";
import { LovesItSection } from "@/components/LovesItSection";
import { CampaignSection } from "@/components/CampaignSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <PushExamplesSection className="pb-28 pt-4" />
      <LovesItSection />
  <CampaignSection />
      <AnalyticsSection />
      <PlatformsSection className="pb-10" />
      <DifferentiationSection />
      <TeamSection />
      <section id="get-started" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Why Clix?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="surface-border rounded-lg p-6">
              <h3 className="mb-2 font-medium text-neutral-100">{f.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Adaptive delivery",
    body: "Send at the moment each user is most likely to engage using time zone + behavioral signals.",
  },
  {
    title: "Visual workflows",
    body: "Compose multi-step notification journeys with branching & experimentation baked in.",
  },
  {
    title: "Deep personalization",
    body: "Template with rich variables & conditional logic without shipping new app releases.",
  },
  {
    title: "A/B & multivariate",
    body: "Continuously test content, timing, and channels—auto promotes winners.",
  },
  {
    title: "Developer-light",
    body: "Drop-in SDK + simple events API. Growth & product teams iterate independently.",
  },
  {
    title: "Privacy & scale",
    body: "Built on modern infra with encryption at rest & in transit. Scales to millions.",
  },
];
