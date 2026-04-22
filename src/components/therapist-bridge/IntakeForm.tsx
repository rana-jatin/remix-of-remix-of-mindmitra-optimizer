import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  concernOptions,
  defaultIntake,
  languageOptions,
  type IntakePrefs,
} from "@/lib/mock/therapist-bridge";
import { toast } from "sonner";

export function IntakeForm({ onApply }: { onApply: (prefs: IntakePrefs) => void }) {
  const [prefs, setPrefs] = useState<IntakePrefs>(defaultIntake);

  const toggleConcern = (c: string) => {
    setPrefs((p) => ({
      ...p,
      concerns: p.concerns.includes(c) ? p.concerns.filter((x) => x !== c) : [...p.concerns, c],
    }));
  };

  return (
    <Card className="rounded-2xl border-border/50 bg-card/70 backdrop-blur tb-shadow-card">
      <CardHeader>
        <CardTitle className="font-serif-display text-2xl font-medium">Tell us what you're looking for</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We'll narrow the directory below. Nothing here is shared without consent.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-3 block">Concerns</Label>
          <div className="flex flex-wrap gap-2">
            {concernOptions.map((c) => {
              const active = prefs.concerns.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleConcern(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label className="mb-2 block">Modality</Label>
            <Select
              value={prefs.modality}
              onValueChange={(v) => setPrefs((p) => ({ ...p, modality: v as IntakePrefs["modality"] }))}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Language</Label>
            <Select
              value={prefs.language}
              onValueChange={(v) => setPrefs((p) => ({ ...p, language: v }))}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {languageOptions.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Therapist gender</Label>
            <Select
              value={prefs.gender}
              onValueChange={(v) => setPrefs((p) => ({ ...p, gender: v as IntakePrefs["gender"] }))}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">No preference</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Budget per session</Label>
            <span className="text-sm font-medium text-foreground">₹{prefs.budget}</span>
          </div>
          <Slider
            value={[prefs.budget]}
            min={1000}
            max={4000}
            step={100}
            onValueChange={([v]) => setPrefs((p) => ({ ...p, budget: v }))}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <button
            type="button"
            onClick={() => setPrefs(defaultIntake)}
            className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            Reset
          </button>
          <Button
            onClick={() => {
              onApply(prefs);
              toast.success("Filters applied", { description: "Directory updated below." });
            }}
          >
            Apply &amp; match
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}