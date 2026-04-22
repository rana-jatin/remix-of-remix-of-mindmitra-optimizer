import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "@/components/therapist-bridge/Hero";
import { EmotionalProfileSection } from "@/components/therapist-bridge/EmotionalProfile";
import { ClinicalActions } from "@/components/therapist-bridge/ClinicalActions";
import { IntakeForm } from "@/components/therapist-bridge/IntakeForm";
import { ConsentForm } from "@/components/therapist-bridge/ConsentForm";
import { ProcessTimeline } from "@/components/therapist-bridge/ProcessTimeline";
import { HandoffExplainer } from "@/components/therapist-bridge/HandoffExplainer";
import { BookingModal } from "@/components/therapist-bridge/BookingModal";
import { CalmBanner } from "@/components/therapist-bridge/CalmBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  defaultConsent,
  defaultIntake,
  minimumConsent,
  type ConsentState,
  type IntakePrefs,
  type Therapist,
} from "@/lib/mock/therapist-bridge";
import { toast } from "sonner";

const TherapistDirectory = lazy(
  () => import("@/components/therapist-bridge/TherapistDirectory"),
);
const DataPreviewModal = lazy(
  () => import("@/components/therapist-bridge/DataPreviewModal"),
);

export const Route = createFileRoute("/therapist-bridge")({
  head: () => ({
    meta: [
      { title: "Therapist Bridge — MindMitra" },
      {
        name: "description",
        content:
          "A consent-first bridge from your daily check-ins to the right therapist. Match, share, and book in minutes.",
      },
      { property: "og:title", content: "Therapist Bridge — MindMitra" },
      {
        property: "og:description",
        content:
          "Match with the right therapist using your emotional profile — you decide what to share.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TherapistBridgePage,
});

function Section({
  id,
  eyebrow,
  title,
  children,
  innerRef,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  innerRef?: React.Ref<HTMLElement>;
}) {
  const localRef = useRef<HTMLElement>(null);
  // assign both refs
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof innerRef === "function") innerRef(node);
      else if (innerRef && "current" in innerRef) {
        (innerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [innerRef],
  );

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    // If already in viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("tb-revealed");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("tb-revealed");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={setRefs}
      className="tb-reveal mx-auto max-w-6xl px-6 py-10 sm:py-14"
    >
      {(eyebrow || title) && (
        <div className="mb-6">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-serif-display mt-2 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

function TherapistBridgePage() {
  const profileRef = useRef<HTMLElement>(null);
  const directoryRef = useRef<HTMLElement>(null);
  const consentRef = useRef<HTMLElement>(null);

  const [prefs, setPrefs] = useState<IntakePrefs>(defaultIntake);
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [pendingTherapist, setPendingTherapist] = useState<Therapist | null>(null);

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleBook = useCallback(
    (t: Therapist) => {
      setPendingTherapist(t);
      if (!minimumConsent(consent)) {
        toast("Consent needed", {
          description: "Enable assessments and contact info to book.",
        });
        scrollTo(consentRef);
        return;
      }
      setBookingOpen(true);
    },
    [consent, scrollTo],
  );

  return (
    <main className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />

      {/* Sticky top nav */}
      <nav className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="/" className="font-serif-display text-lg font-medium text-foreground">
            MindMitra
          </a>
          <div className="hidden gap-6 text-xs font-medium text-muted-foreground sm:flex">
            <button onClick={() => scrollTo(profileRef)} className="transition-colors hover:text-foreground">Profile</button>
            <button onClick={() => scrollTo(directoryRef)} className="transition-colors hover:text-foreground">Therapists</button>
            <button onClick={() => scrollTo(consentRef)} className="transition-colors hover:text-foreground">Consent</button>
          </div>
        </div>
      </nav>

      <Hero
        onProfile={() => scrollTo(profileRef)}
        onFind={() => scrollTo(directoryRef)}
      />

      <Section
        id="profile"
        eyebrow="Your signal"
        title="Emotional profile"
        innerRef={profileRef}
      >
        <div className="space-y-4">
          <EmotionalProfileSection />
          <ClinicalActions onPreview={() => setPreviewOpen(true)} />
        </div>
      </Section>

      <Section id="intake" eyebrow="Step 1" title="Intake preferences">
        <IntakeForm onApply={setPrefs} />
      </Section>

      <CalmBanner />

      <Section
        id="directory"
        eyebrow="Step 2"
        title="Matched therapists"
        innerRef={directoryRef}
      >
        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          }
        >
          <TherapistDirectory prefs={prefs} onBook={handleBook} />
        </Suspense>
      </Section>

      <Section
        id="consent"
        eyebrow="Step 3"
        title="Your consent"
        innerRef={consentRef}
      >
        <ConsentForm consent={consent} onChange={setConsent} />
      </Section>

      <Section id="process" eyebrow="The flow" title="From signal to session">
        <ProcessTimeline />
      </Section>

      <Section id="handoff" eyebrow="Transparency" title="What gets handed off">
        <HandoffExplainer />
      </Section>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-muted-foreground">
          MindMitra · Therapist Bridge demo. All data shown is illustrative.
        </div>
      </footer>

      <Suspense fallback={null}>
        {previewOpen && (
          <DataPreviewModal
            open={previewOpen}
            onOpenChange={setPreviewOpen}
            consent={consent}
          />
        )}
      </Suspense>

      <BookingModal
        therapist={pendingTherapist}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </main>
  );
}