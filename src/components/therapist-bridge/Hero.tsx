import { Button } from "@/components/ui/button";
import { Sparkles, ArrowDown, ShieldCheck, Leaf } from "lucide-react";

// Calming Unsplash image — soft misty forest at dawn
const HERO_IMG =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80";

export function Hero({ onProfile, onFind }: { onProfile: () => void; onFind: () => void }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* layered backgrounds */}
      <div className="absolute inset-0 tb-gradient-calm" aria-hidden />
      <div className="absolute inset-0 tb-grid-bg opacity-50" aria-hidden />

      {/* floating ambient blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full opacity-40 blur-3xl tb-float"
        style={{ background: "radial-gradient(circle, var(--primary-glow), transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl tb-float"
        style={{
          background: "radial-gradient(circle, var(--primary), transparent 70%)",
          animationDelay: "-3s",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="tb-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 tb-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Leaf className="h-3 w-3 text-primary" />
            A gentle bridge to care
          </div>

          <h1 className="font-serif-display mt-6 text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Find your calm.{" "}
            <span className="tb-shine">Find your therapist.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A quiet, consent-first handoff from your daily check-ins to a clinician
            who truly fits. Share only what feels right. No pressure, no rush.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onProfile}
              className="group rounded-full tb-shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="mr-1 h-4 w-4" />
              See my emotional profile
              <ArrowDown className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onFind}
              className="rounded-full border-primary/30 transition-colors hover:bg-primary/5"
            >
              Find a therapist
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> You decide what to share
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Personalised matches
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 200+ verified clinicians
            </span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] tb-shadow-glow">
            <img
              src={HERO_IMG}
              alt="A serene mountain landscape at dawn — a moment of stillness"
              loading="eager"
              className="h-full w-full object-cover tb-drift"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, oklch(0.62 0.07 195 / 0.25) 100%)",
              }}
              aria-hidden
            />
          </div>
          {/* breathing dot */}
          <div
            className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full tb-breathe"
            style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
            aria-hidden
          />
          <div className="absolute -top-4 -right-4 rounded-2xl tb-glass px-4 py-3 text-xs">
            <p className="font-semibold text-foreground">Take a breath</p>
            <p className="text-muted-foreground">You're in the right place.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
