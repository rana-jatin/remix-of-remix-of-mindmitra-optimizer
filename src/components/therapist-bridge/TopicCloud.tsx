import type { EmotionalProfile } from "@/lib/mock/therapist-bridge";

export function TopicCloud({ topics }: { topics: EmotionalProfile["topics"] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {topics.map((t, i) => {
        const size = 0.78 + (t.weight / 10) * 0.7;
        const opacity = 0.55 + (t.weight / 10) * 0.45;
        return (
          <span
            key={t.word}
            className="cursor-default rounded-full border border-primary/15 bg-accent/40 px-3 py-1 font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/70 hover:shadow-sm"
            style={{
              fontSize: `${size}rem`,
              opacity,
              animation: `tb-fade-up 0.5s ease-out ${i * 40}ms both`,
            }}
          >
            {t.word}
          </span>
        );
      })}
    </div>
  );
}
