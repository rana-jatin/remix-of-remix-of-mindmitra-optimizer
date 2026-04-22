import { Card, CardContent } from "@/components/ui/card";
import { FileText, Brain, MessageSquare } from "lucide-react";

const cards = [
  {
    icon: FileText,
    title: "Structured summary",
    desc: "A one-page clinician brief with assessments and risk flags.",
  },
  {
    icon: Brain,
    title: "Pattern context",
    desc: "Trends in mood, sleep, and recurring themes from your check-ins.",
  },
  {
    icon: MessageSquare,
    title: "Your own words",
    desc: "Optional excerpts you star — never raw transcripts.",
  },
];

export function HandoffExplainer() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <Card
          key={c.title}
          className="rounded-2xl border-border/50 bg-card/70 backdrop-blur tb-shadow-card transition-all hover:-translate-y-0.5 hover:tb-shadow-soft"
        >
          <CardContent className="p-6">
            <span className="grid h-11 w-11 place-content-center rounded-xl bg-accent/80 text-accent-foreground tb-shadow-soft">
              <c.icon className="h-5 w-5" />
            </span>
            <h4 className="font-serif-display mt-4 text-xl font-medium text-foreground">{c.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}