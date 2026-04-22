import { ClipboardList, Sparkles, ShieldCheck, CalendarCheck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Intake", desc: "Tell us what you need." },
  { icon: Sparkles, title: "Match", desc: "We surface the best-fit therapists." },
  { icon: ShieldCheck, title: "Consent", desc: "Choose exactly what to share." },
  { icon: CalendarCheck, title: "Book", desc: "Confirm your first session." },
];

const TIMELINE_IMG =
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80";

export function ProcessTimeline() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card tb-shadow-card">
      <div className="relative h-32 overflow-hidden sm:h-40">
        <img
          src={TIMELINE_IMG}
          alt="Calm ocean horizon"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--card) 95%)",
          }}
          aria-hidden
        />
      </div>
      <div className="p-6 -mt-4 relative">
      <h3 className="text-sm font-semibold text-muted-foreground">How the bridge works</h3>
      <ol className="mt-5 grid gap-6 sm:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="group relative">
            {i < steps.length - 1 && (
              <span
                className="absolute left-10 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-primary/40 via-primary/20 to-transparent sm:block"
                aria-hidden
              />
            )}
            <div className="flex items-start gap-3">
              <span className="relative grid h-10 w-10 shrink-0 place-content-center rounded-full tb-gradient-hero text-primary-foreground tb-shadow-soft transition-transform group-hover:scale-110">
                <s.icon className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-content-center rounded-full bg-background text-[10px] font-semibold text-primary ring-1 ring-primary/30">
                  {i + 1}
                </span>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}