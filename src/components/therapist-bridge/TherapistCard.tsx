import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Video, MapPin, Clock } from "lucide-react";
import type { Therapist } from "@/lib/mock/therapist-bridge";

export function TherapistCard({
  therapist,
  onBook,
}: {
  therapist: Therapist;
  onBook: (t: Therapist) => void;
}) {
  const initials = therapist.name
    .replace(/Dr\.?\s*/, "")
    .split(/\s|,/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("");

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/60 tb-shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:tb-shadow-glow">
      <span
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-start gap-3">
          <div
            className="grid h-12 w-12 shrink-0 place-content-center rounded-full text-sm font-semibold text-primary-foreground"
            style={{
              background: `linear-gradient(135deg, oklch(0.6 0.1 ${therapist.avatarHue}), oklch(0.75 0.11 ${therapist.avatarHue + 15}))`,
            }}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground">{therapist.name}</h3>
            <p className="truncate text-xs text-muted-foreground">{therapist.credentials}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {therapist.rating}
            <span className="text-muted-foreground">({therapist.reviews})</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {therapist.specialties.map((s) => (
            <Badge key={s} variant="secondary" className="font-normal">
              {s}
            </Badge>
          ))}
        </div>

        <p className="mt-3 text-sm text-muted-foreground">{therapist.bio}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {therapist.modality.includes("virtual") ? (
              <Video className="h-3.5 w-3.5" />
            ) : (
              <MapPin className="h-3.5 w-3.5" />
            )}
            {therapist.modality.join(" · ")}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {therapist.nextAvailable}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-xs text-muted-foreground">Per session</p>
            <p className="text-lg font-semibold text-foreground">₹{therapist.pricePerSession}</p>
          </div>
          <Button
            onClick={() => onBook(therapist)}
            className="transition-transform group-hover:scale-105"
          >
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}