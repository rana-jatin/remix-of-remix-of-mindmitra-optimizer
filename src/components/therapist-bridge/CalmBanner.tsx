import { Wind } from "lucide-react";

const IMG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";

export function CalmBanner() {
  return (
    <section className="relative mx-auto max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/10 tb-shadow-soft">
        <img
          src={IMG}
          alt="Soft ocean waves at golden hour"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover tb-drift"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.62 0.07 195 / 0.78) 0%, oklch(0.78 0.08 185 / 0.55) 60%, transparent 100%)",
          }}
          aria-hidden
        />
        <div className="relative grid gap-6 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Wind className="h-3.5 w-3.5" />
              A small pause
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
              Breathe in for four. Hold for four. Out for six.
            </h3>
            <p className="mt-2 text-sm text-white/85 sm:text-base">
              Whatever brought you here, you're already taking a kind step.
              Take this moment before we move on.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative grid h-32 w-32 place-content-center sm:h-40 sm:w-40">
              <span
                className="absolute inset-0 rounded-full bg-white/25 tb-breathe"
                aria-hidden
              />
              <span
                className="absolute inset-3 rounded-full bg-white/35 tb-breathe"
                style={{ animationDelay: "-1.5s" }}
                aria-hidden
              />
              <span className="relative text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                Breathe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
