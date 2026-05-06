import { CheckCircle, Clock3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Clock3, title: "48h", subtitle: "Rückmeldung" },
  { icon: User, title: "Persönlich", subtitle: "Ausgewählt" },
  { icon: CheckCircle, title: "Sie entscheiden", subtitle: "Wann Sie wollen" },
] as const;

export function CtaMiniTimeline({ className }: { className?: string }): JSX.Element {
  return (
    <div className={cn("mt-4 grid w-full max-w-md grid-cols-3 items-start text-center", className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className={cn("px-2", index < items.length - 1 && "border-r border-white/20")}
          >
            <Icon className="mx-auto mb-1 h-3.5 w-3.5 text-white/60" aria-hidden />
            <p className="text-[11px] leading-tight text-white/70">{item.title}</p>
            <p className="text-[11px] leading-tight text-white/50">{item.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
