import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  HeartPulse,
  Wind,
  Sparkles,
  ShieldCheck,
  Leaf,
  Users,
} from "lucide-react";

// Soft painterly forest — calm morning light
const HERO_BG =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindMitra — A quiet bridge to care" },
      {
        name: "description",
        content:
          "MindMitra bridges your daily emotional check-ins to the right therapist, with consent-first sharing.",
      },
      { property: "og:title", content: "MindMitra — A quiet bridge to care" },
      {
        property: "og:description",
        content: "From self-reflection to the right clinician — in minutes.",
      },
      { property: "og:image", content: HERO_BG },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Wind,
    title: "Daily check-ins",
    desc: "Small reflections. No streaks. Just a place to land.",
    tone: "moss",
  },
  {
    icon: Sparkles,
    title: "Gentle matches",
    desc: "Therapists who fit your needs, language, and pace.",
    tone: "terracotta",
  },
  {
    icon: ShieldCheck,
    title: "Consent first",
    desc: "Share only what feels right. You decide, always.",
    tone: "sand",
  },
  {
    icon: Users,
    title: "Verified clinicians",
    desc: "200+ licensed therapists across India and beyond.",
    tone: "moss",
  },
] as const;

const toneStyles: Record<string, string> = {
  moss: "from-[oklch(0.78_0.08_140)] to-[oklch(0.62_0.08_135)] text-white",
  terracotta:
    "from-[oklch(0.78_0.1_55)] to-[oklch(0.65_0.13_45)] text-white",
  sand: "from-[oklch(0.88_0.04_85)] to-[oklch(0.78_0.06_70)] text-[oklch(0.32_0.05_55)]",
};

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Painterly hero backdrop */}
      <div className="absolute inset-x-0 top-0 h-[100vh]" aria-hidden>
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* warm wash + bottom fade into background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.96 0.022 90 / 0.55) 0%, oklch(0.96 0.022 90 / 0.35) 35%, oklch(0.96 0.018 75 / 0.85) 70%, var(--background) 100%)",
          }}
        />
      </div>

      {/* Top brand bar */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          <HeartPulse className="h-3.5 w-3.5 text-primary" />
          MindMitra
        </div>
        <Link
          to="/therapist-bridge"
          className="text-xs font-medium text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
        >
          Therapist Bridge →
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-12 pb-24 text-center sm:pt-20 tb-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          a quiet bridge to care
        </p>
        <h1 className="font-serif-display mt-5 text-5xl font-medium leading-[1.05] text-foreground sm:text-7xl">
          MindMitra
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A soft place for daily reflection — and a gentle bridge to the
          right therapist when you're ready. No pressure. Just space.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full tb-shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Link to="/therapist-bridge">
              Open Therapist Bridge
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-foreground/15 bg-white/40 backdrop-blur transition-colors hover:bg-white/60"
          >
            <Link to="/therapist-bridge" hash="profile">
              <Leaf className="mr-1 h-4 w-4 text-primary" />
              Begin a check-in
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature cards — glass on warm wash */}
      <section className="relative z-10 mx-auto -mt-8 grid max-w-4xl gap-4 px-6 pb-20 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 p-5 backdrop-blur-xl tb-shadow-card transition-all hover:-translate-y-0.5 hover:bg-white/70"
          >
            <span
              className={`grid h-11 w-11 place-content-center rounded-xl bg-gradient-to-br ${toneStyles[f.tone]} tb-shadow-soft`}
            >
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="font-serif-display mt-4 text-2xl font-medium text-foreground">
              {f.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
          </div>
        ))}
      </section>

      {/* Footer line */}
      <footer className="relative z-10 pb-12 text-center text-xs text-muted-foreground">
        Take what you need. Leave the rest.
      </footer>
    </main>
  );
}
