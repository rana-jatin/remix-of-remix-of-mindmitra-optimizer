import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import type { ConsentState } from "@/lib/mock/therapist-bridge";

const items: { key: keyof ConsentState; label: string; desc: string }[] = [
  { key: "assessments", label: "Share assessments", desc: "PHQ-9, GAD-7 scores and severity." },
  { key: "fullProfile", label: "Share full emotional profile", desc: "Mood trends, patterns, topics." },
  { key: "sessionSummaries", label: "Share session summaries", desc: "AI-generated reflection notes." },
  { key: "contactInfo", label: "Share contact information", desc: "Name and email — required to book." },
];

export function ConsentForm({
  consent,
  onChange,
}: {
  consent: ConsentState;
  onChange: (c: ConsentState) => void;
}) {
  return (
    <Card className="rounded-2xl border-border/50 bg-card/70 backdrop-blur tb-shadow-card">
      <CardHeader>
        <CardTitle className="font-serif-display flex items-center gap-2 text-2xl font-medium">
          <ShieldCheck className="h-5 w-5 text-primary" />
          What you share
        </CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You stay in control. Toggle exactly what your therapist receives.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((it) => (
          <div
            key={it.key}
            className="flex items-start justify-between gap-4 rounded-xl border bg-background/40 p-4"
          >
            <div>
              <Label htmlFor={`c-${it.key}`} className="text-sm font-medium text-foreground">
                {it.label}
              </Label>
              <p className="mt-0.5 text-xs text-muted-foreground">{it.desc}</p>
            </div>
            <Switch
              id={`c-${it.key}`}
              checked={consent[it.key]}
              onCheckedChange={(v) => onChange({ ...consent, [it.key]: v })}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}