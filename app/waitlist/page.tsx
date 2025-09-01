import Link from "next/link";

export const metadata = {
  title: "Clix Waitlist – Early Access",
  description:
    "Join the Clix early access waitlist for 1:1 onboarding and shape the product with us.",
};

export default function WaitlistPage() {
  return (
    <main className="relative">
      <section className="relative isolate overflow-hidden pt-28 pb-20 hero-gradient">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Early Access</span>{" "}
            <span className="text-neutral-300">Waitlist</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-neutral-400">
            We're intentionally moving a little slower right now. Every new team
            gets a friendly 1:1 onboarding so we can deeply understand what you
            need – then we ship improvements almost daily.
          </p>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            If you'd like to use Clix early, give feedback, and lock in{" "}
            <span className="text-neutral-200 font-medium">
              free lifetime access
            </span>
            , just send a short email about your app (what it does, rough user
            count, and how you hope to use notifications). We'll reply within 1
            business day.
          </p>
          <div className="mt-10 inline-flex flex-col items-center gap-3">
            <a
              href="mailto:jeongwoo@clix.so?subject=Clix%20Early%20Access%20Request&body=Hi%20Clix%20team%2C%0A%0AApp%20name%3A%20%0AWhat%20the%20app%20does%3A%20%0ACurrent%20platforms%20(iOS%2C%20Android%2C%20Web)%3A%20%0AMonthly%20active%20users%20(rough)%3A%20%0AHow%20we'd%20like%20to%20use%20Clix%3A%20%0A%0AAnything%20else%3A%20%0A%0AThanks!"
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-brand-500 px-8 py-4 text-sm font-medium text-white shadow-[0_0_0_0_rgba(0,196,159,0.5)] transition hover:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Email jeongwoo@clix.so
            </a>
            <p className="text-xs text-neutral-500">Opens your mail client</p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-28 pt-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="surface-border rounded-lg p-6">
            <h3 className="mb-2 font-medium text-neutral-100">
              1:1 Onboarding
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              We set things up together, review your first campaigns, and help
              you wire events.
            </p>
          </div>
          <div className="surface-border rounded-lg p-6">
            <h3 className="mb-2 font-medium text-neutral-100">
              Rapid Iteration
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              Feature requests from onboarded teams often ship in under a week
              while we're still small.
            </p>
          </div>
          <div className="surface-border rounded-lg p-6">
            <h3 className="mb-2 font-medium text-neutral-100">Lifetime Free</h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              Early collaborators who actively share product feedback keep using
              Clix for free.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-500">
            Prefer a form? Reach out by email first – we'll send a short intake
            if helpful.
          </p>
          <p className="mt-2 text-xs text-neutral-600">
            We'll never share your info. This just helps us tailor the
            onboarding.
          </p>
          <div className="mt-6">
            <Link href="/" className="text-sm text-brand-400 hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
