
# TherapistBridge — Visual/UX Redesign (Mock Data)

A polished, performant recreation of the MindMitra TherapistBridge page using mock data — no backend, no auth. Built natively for this TanStack Start project.

## Route
- New route: `/therapist-bridge` (`src/routes/therapist-bridge.tsx`) with its own SEO meta (title, description, og tags).
- Update `src/routes/index.tsx` (currently placeholder) into a simple landing page that links to `/therapist-bridge`.

## Page Sections (top → bottom)
1. **Hero** — headline "Bridge to the right therapist", supporting copy, two CTAs ("See my emotional profile" / "Find a therapist") that smooth-scroll to sections below.
2. **Emotional Profile card** — mock data: mood chart (7-day trend), top patterns, topic cloud, assessment scores (PHQ-9, GAD-7) with severity badges.
3. **Clinical Sync & Export bar** — "Sync device" + "Export PDF" buttons (UI only, toast feedback).
4. **Intake Form** — preferences: concerns (multi-select chips), modality (in-person/virtual), language, gender preference, budget slider, availability. Apply button filters the directory.
5. **Therapist Directory** — responsive card grid with photo, name, credentials, specialties, modality, rating, price/session, "Book" button. Filters from intake apply live.
6. **Consent Form** — toggles: share assessments, share full profile, share session summaries, share contact info. Required before booking.
7. **Process Timeline** — 4-step visual: Intake → Match → Consent → Book.
8. **Handoff Explainer** — short 3-card explainer of what the therapist receives.
9. **Dashboard Preview / Data Preview Modal** — opens from a "Preview what the therapist sees" button, shows exact shared data based on consent toggles.

## Booking Flow
- Click **Book** on a therapist → if consent insufficient, open Consent modal; otherwise open a Booking confirmation modal showing summary + success toast.

## Visual Design
- Calm, clinical wellness aesthetic: soft neutrals, sage/teal accent, generous spacing, rounded-2xl cards, subtle shadows.
- Typography hierarchy with clear section headers and supporting muted copy.
- Light/dark mode via existing tokens; new accent tokens added to `src/styles.css`.
- Subtle entrance animations (fade/slide-up on scroll) using CSS only — no heavy libraries.
- Fully responsive: single column mobile, 2-col tablet, 3-col desktop for therapist grid.
- Accessible: proper labels, focus rings, keyboard nav for modals/toggles, semantic landmarks.

## Performance Optimisations
- Code-split heavy sections (Directory, Data Preview Modal) via `React.lazy` + `Suspense` skeletons.
- Memoise filtered therapist list with `useMemo`; stable callbacks with `useCallback`.
- Mock data lives in `src/lib/mock/therapist-bridge.ts` — imported once, no re-fetching.
- Skeleton loaders for the initial paint of profile + directory (simulated brief delay for realism, removable).
- Images: use lightweight SVG avatars / `loading="lazy"` for any photos.
- No external icon/animation libs beyond `lucide-react` (already present).
- Smooth-scroll via `scrollIntoView` (no router churn).

## File Structure
```
src/routes/therapist-bridge.tsx         (route + page composition)
src/components/therapist-bridge/
  Hero.tsx
  EmotionalProfile.tsx
  MoodChart.tsx                         (lightweight inline SVG chart)
  PatternsCard.tsx
  TopicCloud.tsx
  AssessmentScores.tsx
  ClinicalActions.tsx
  IntakeForm.tsx
  TherapistDirectory.tsx
  TherapistCard.tsx
  ConsentForm.tsx
  ProcessTimeline.tsx
  HandoffExplainer.tsx
  DataPreviewModal.tsx
  BookingModal.tsx
src/lib/mock/therapist-bridge.ts        (therapists, profile, types)
```

## Out of Scope
- Real authentication, database, or referral persistence.
- Real PDF export (button shows a toast).
- Real device sync.
