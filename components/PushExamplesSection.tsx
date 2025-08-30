"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Check,
  Copy,
  Info,
  Target,
  FlaskConical,
  Clock,
  BarChart2,
  Rocket,
  Bell,
  Languages,
  ShoppingCart,
  Flame,
  Dumbbell,
  Pizza,
  MessageCircle,
  Sword,
} from "lucide-react";
import clsx from "clsx";

/**
 * Data model for a push example (Clix concept mapping)\n
 */
export interface PushExampleConfig {
  goal: string;
  audience: string;
  trigger: string;
  timing: string;
  message: string; // variables description
  personalizationTokens: string;
  deliveryType: string;
  throttle: string;
  abTest: string;
  successMetric: string;
  fallback: string;
}

export interface PushExample {
  id: string;
  title: string;
  body: string;
  icon: React.ReactNode; // lucide icon
  category: string;
  config: PushExampleConfig;
}

export interface PushExamplesSectionProps {
  examples?: PushExample[];
  initialSelectedId?: string;
  onViewDocs?: (example: PushExample) => void;
  onTryInConsole?: (example: PushExample) => void;
  className?: string;
}

// Minimal toast system (local) -------------------------------------------------
interface Toast {
  id: number;
  message: string;
}

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200);
  }, []);
  const ToastViewport = () => (
    <div className="pointer-events-none fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto rounded-md bg-neutral-900/90 text-neutral-100 text-sm px-3 py-2 shadow border border-white/10 animate-in fade-in slide-in-from-bottom-1"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
  return { push, ToastViewport };
}

// Seed examples data -----------------------------------------------------------
const seededExamples: PushExample[] = [
  {
    id: "cart",
    title: "Your cart is waiting",
    body: "Still thinking it over? Get 10% off if you complete your order today.",
    icon: <ShoppingCart className="size-4" />,
    category: "Retention",
    config: {
      goal: "Recover abandoned carts",
      audience: "Users with items in cart and no purchase in 24 hours",
      trigger: "Server event cart_abandoned",
      timing:
        "Send at 30 minutes after last cart activity; local send windows 09–21",
      message: "Variables: first_name, cart_value, discount_code",
      personalizationTokens: "first_name, discount_code",
      deliveryType: "Remote push standard priority",
      throttle: "Max one cart reminder per 24 hours",
      abTest: "A plain copy vs B includes percent saved",
      successMetric: "Checkout conversion within 24 hours",
      fallback: "Send email if push not delivered in 15 minutes",
    },
  },
  {
    id: "streak",
    title: "Time to practice",
    body: "Just 5 minutes today will keep your streak alive. Let's go",
    icon: <Flame className="size-4" />,
    category: "Engagement",
    config: {
      goal: "Daily practice adherence",
      audience: "Learners with active streak >= 2",
      trigger: "Scheduled daily job based on user preferred hour",
      timing: "Local time preferred_hour; Do not disturb 22–07",
      message: "Variables: first_name, streak_days",
      personalizationTokens: "streak_days",
      deliveryType:
        "Remote push time sensitive allowed category Learning Reminder",
      throttle: "One per day",
      abTest: "A with emoji vs B without emoji",
      successMetric: "Session start within one hour",
      fallback: "Schedule local reminder if app opened but no practice",
    },
  },
  {
    id: "fitness",
    title: "Stay on track",
    body: "You crushed 2 workouts this week. Ready for number 3?",
    icon: <Dumbbell className="size-4" />,
    category: "Habit",
    config: {
      goal: "Increase weekly workouts per user",
      audience: "Users with two workouts completed since Monday",
      trigger: "Analytics event workout_completed counts per week",
      timing: "Send Friday 17–20 local time",
      message: "Variables: first_name, weekly_workout_count",
      personalizationTokens: "weekly_workout_count",
      deliveryType: "Remote push standard",
      throttle: "One message per user per week",
      abTest: "A aspirational phrasing vs B coach tone",
      successMetric: "Third workout completion within 72 hours",
      fallback: "In-app banner on next open",
    },
  },
  {
    id: "promo",
    title: "Hungry?",
    body: "Free delivery for the next 30 minutes in your area",
    icon: <Pizza className="size-4" />,
    category: "Promo",
    config: {
      goal: "Drive quick orders during off peak",
      audience: "Users in delivery zones with low utilization",
      trigger: "Ops signal low_utilization true",
      timing: "Immediate with expiry 30 minutes",
      message: "Variables: zone_name, promo_end_at",
      personalizationTokens: "zone_name, promo_end_at",
      deliveryType: "Remote push high priority; collapse key zone_promo",
      throttle: "Two promos per week per user",
      abTest: "A free delivery vs B percent off",
      successMetric: "Orders within 30 minutes",
      fallback: "SMS for users with SMS opt-in and recent purchase",
    },
  },
  {
    id: "report",
    title: "Your weekly spending report is here",
    body: "You saved 25% more compared to last week. Keep it up",
    icon: <BarChart2 className="size-4" />,
    category: "Report",
    config: {
      goal: "Weekly engagement and savings awareness",
      audience: "Active users with connected card",
      trigger: "Weekly batch compute on Sunday",
      timing: "Sunday 10:00 local time",
      message: "Variables: first_name, weekly_change_percent, top_category",
      personalizationTokens: "weekly_change_percent, top_category",
      deliveryType: "Remote push standard",
      throttle: "One report per week",
      abTest: "A with category callout vs B simple summary",
      successMetric: "Report open rate and navigation to insights",
      fallback: "Email report if push not opened in 24 hours",
    },
  },
  {
    id: "comment",
    title: "You got a new comment",
    body: "Alex just replied to your post. Open the app to see what they said",
    icon: <MessageCircle className="size-4" />,
    category: "Social",
    config: {
      goal: "Bring users back to conversations",
      audience: "Post authors with new comments from non-muted users",
      trigger: "Event comment_created",
      timing: "Immediate with rate limit per thread",
      message: "Variables: commenter_name, post_title",
      personalizationTokens: "commenter_name",
      deliveryType: "Remote push high priority",
      throttle: "Max three per thread per hour then summary",
      abTest: "A names commenter vs B anonymized first name",
      successMetric: "Return session and thread open",
      fallback: "Daily digest if rate limit exceeded",
    },
  },
  {
    id: "event",
    title: "The battle begins",
    body: "Join the weekend event now and earn double rewards",
    icon: <Sword className="size-4" />,
    category: "Event",
    config: {
      goal: "Increase weekend DAU",
      audience: "Level 10+ who played in the last 14 days",
      trigger: "Scheduled campaign Friday",
      timing: "Friday 18:00 local time",
      message: "Variables: player_level, event_name, reward_multiplier",
      personalizationTokens: "player_level, reward_multiplier",
      deliveryType: "Remote push standard; category Events",
      throttle: "One pre-event reminder and one day-two reminder",
      abTest: "A time-based urgency vs B reward forward",
      successMetric: "Event participation rate",
      fallback: "In-app inbox message on next open",
    },
  },
];

// Icon placeholder fallback
function FrameIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Bell {...props} />;
}

// Tabs definition ---------------------------------------------------------------------------
const tabs = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "targeting", label: "Targeting", icon: Target },
  { id: "trigger", label: "Trigger", icon: Clock },
  { id: "message", label: "Message", icon: Bell },
  { id: "delivery", label: "Delivery", icon: Rocket },
  { id: "experiments", label: "Experiments", icon: FlaskConical },
  { id: "metrics", label: "Metrics", icon: BarChart2 },
];

type TabId = (typeof tabs)[number]["id"];

// NotificationCard sub component ------------------------------------------------------------
interface NotificationCardProps {
  example: PushExample;
  active: boolean;
  onClick: () => void;
  onFocus: () => void;
  index: number;
}

const emojiVariants: Record<string, { title: string; body: string }> = {
  cart: {
    title: "🛒 Your cart is waiting",
    body: "Still thinking? Extra 10% off if you finish now.",
  },
  streak: {
    title: "🔥 Time to practice",
    body: "5 mins keeps your streak alive. Go!",
  },
  fitness: {
    title: "💪 Stay on track",
    body: "2 workouts done. Ready for #3?",
  },
  promo: { title: "🍕 Hungry?", body: "Free delivery 30 mins. Order fast!" },
  report: {
    title: "📊 Weekly report",
    body: "You saved 25% more vs last week.",
  },
  comment: {
    title: "💬 New comment",
    body: "Alex replied. See what they said.",
  },
  event: {
    title: "⚔️ The battle begins",
    body: "Weekend event live. Double rewards!",
  },
};

const NotificationCard = React.forwardRef<
  HTMLButtonElement,
  NotificationCardProps
>(function NotificationCard({ example, active, onClick, onFocus, index }, ref) {
  const title = emojiVariants[example.id]?.title || example.title;
  const body = emojiVariants[example.id]?.body || example.body;
  return (
    <button
      ref={ref}
      role="option"
      aria-selected={active}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={active ? 0 : -1}
      className={clsx(
        "group relative flex w-full flex-col items-start text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        active ? "opacity-100" : "opacity-90 hover:opacity-100"
      )}
      data-active={active}
    >
      <div
        className={clsx(
          "flex w-full max-w-[360px] items-start gap-3 rounded-2xl border px-3 py-3 shadow-sm transition will-change-transform",
          active
            ? "bg-neutral-800/90 border-brand-500/60 shadow-brand-500/10 shadow"
            : "bg-neutral-800/60 border-white/5 group-hover:border-white/10"
        )}
      >
        <div className="size-10 bg-neutral-700 rounded-md flex items-center justify-center self-center ring-1 ring-white/10 text-neutral-200">
          {example.icon || <FrameIcon className="size-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <p className="text-[13px] font-semibold text-white truncate">
              {title}
            </p>
            <span className="text-[10px] text-neutral-500 ml-auto">now</span>
          </div>
          <p className="text-[12px] text-neutral-400 line-clamp-2 leading-snug">
            {body}
          </p>
        </div>
      </div>
    </button>
  );
});

// Helper: code sample generation ------------------------------------------------------------
function buildCodeSamples(example: PushExample) {
  const payload = {
    user_id: "user_123",
    title: example.title,
    body: example.body,
    tokens: example.config.personalizationTokens.split(/[, ]+/).filter(Boolean),
    trigger: example.config.trigger,
  };
  const js = `await fetch('https://api.clix.dev/v1/push', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(${JSON.stringify(
    payload,
    null,
    2
  )})\n});`;
  const swift = `let url = URL(string: "https://api.clix.dev/v1/push")!\nvar request = URLRequest(url: url)\nrequest.httpMethod = "POST"\nrequest.addValue("Bearer YOUR_API_KEY", forHTTPHeaderField: "Authorization")\nrequest.addValue("application/json", forHTTPHeaderField: "Content-Type")\nlet body: [String: Any] = ${JSON.stringify(
    payload,
    null,
    2
  )}\nrequest.httpBody = try! JSONSerialization.data(withJSONObject: body)\nlet task = URLSession.shared.dataTask(with: request) { data, resp, err in\n  // handle\n}\ntask.resume()`;
  return { js, swift };
}

// Main component ---------------------------------------------------------------------------
export const PushExamplesSection: React.FC<PushExamplesSectionProps> = ({
  examples = seededExamples,
  initialSelectedId,
  onViewDocs,
  onTryInConsole,
  className,
}) => {
  const { push: pushToast, ToastViewport } = useToasts();
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedId || examples[0]?.id
  );
  const [tabState, setTabState] = useState<Record<string, TabId>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevSelected = useRef<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const selectedExample =
    examples.find((e) => e.id === selectedId) || examples[0];
  const currentTab = tabState[selectedExample.id] || "overview";

  // Keyboard navigation for listbox
  const handleListKey = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = examples.findIndex((e) => e.id === selectedId);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (idx + 1) % examples.length;
        setSelectedId(examples[next].id);
        optionRefs.current[next]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (idx - 1 + examples.length) % examples.length;
        setSelectedId(examples[prev].id);
        optionRefs.current[prev]?.focus();
      } else if (e.key === "Enter") {
        // no-op; selection already shown
      }
    },
    [examples, selectedId]
  );

  // Animation trigger when selection changes
  useEffect(() => {
    if (prevSelected.current && prevSelected.current !== selectedId) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 260);
      return () => clearTimeout(t);
    }
    prevSelected.current = selectedId;
  }, [selectedId]);

  // Code samples memo
  const codeSamples = useMemo(
    () => buildCodeSamples(selectedExample),
    [selectedExample]
  );

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => pushToast("Copied"));
  };

  const setTab = (id: TabId) =>
    setTabState((s) => ({ ...s, [selectedExample.id]: id }));

  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-16",
        className
      )}
      aria-labelledby="push-examples-heading"
    >
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h2
            id="push-examples-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-100"
          >
            Push examples that ship in minutes
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Choose an example to see how to configure it in Clix.
          </p>
        </div>
        {/* Emoji-only mode now; toggle removed */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column: listbox with notifications */}
        <div
          role="listbox"
          aria-label="Push examples"
          tabIndex={0}
          onKeyDown={handleListKey}
          ref={listRef}
          className="flex max-h-[560px] flex-col gap-3 overflow-y-auto pl-3 pr-2 hide-scrollbar overflow-x-visible"
        >
          {examples.map((ex, i) => (
            <NotificationCard
              key={ex.id}
              example={ex}
              active={selectedId === ex.id}
              onClick={() => setSelectedId(ex.id)}
              onFocus={() => setSelectedId(ex.id)}
              index={i}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        {/* Right column: details panel */}
        <div
          aria-live="polite"
          className={clsx(
            "relative rounded-lg border border-white/10 bg-white/[0.02] p-4 md:p-6 overflow-hidden",
            "min-h-[520px]"
          )}
        >
          <div
            className={clsx(
              "absolute inset-0 pointer-events-none transition-opacity duration-200",
              animating ? "opacity-100" : "opacity-0",
              "bg-gradient-to-r from-brand-500/5 to-transparent"
            )}
          ></div>
          <div
            className="flex flex-wrap items-center gap-3 mb-4"
            role="tablist"
            aria-label="Configuration detail tabs"
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = currentTab === t.id;
              const tabId = `tab-${selectedExample.id}-${t.id}`;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as TabId)}
                  id={tabId}
                  className={clsx(
                    "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                    active
                      ? "bg-brand-500 text-white"
                      : "bg-white/5 text-neutral-300 hover:text-white"
                  )}
                  aria-selected={active}
                  aria-controls={`panel-${selectedExample.id}-${t.id}`}
                  role="tab"
                >
                  <Icon className="size-3" /> {t.label}
                </button>
              );
            })}
          </div>
          <div
            key={selectedExample.id + currentTab}
            id={`panel-${selectedExample.id}-${currentTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedExample.id}-${currentTab}`}
            className={clsx(
              "transition-all duration-250",
              animating
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            )}
          >
            <DetailsContent
              example={selectedExample}
              tab={currentTab}
              codeSamples={codeSamples}
              onCopy={copy}
            />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-4">
            <button
              onClick={() => {
                onViewDocs?.(selectedExample);
                pushToast("Opening docs...");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs font-medium text-neutral-200 hover:bg-white/15"
            >
              View Docs
            </button>
            <button
              onClick={() => {
                onTryInConsole?.(selectedExample);
                pushToast("Launching console...");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-xs font-medium text-white hover:bg-brand-400"
            >
              Try in Console
            </button>
          </div>
        </div>
      </div>
      <ToastViewport />
    </section>
  );
};

// Details content renderer ------------------------------------------------------
const Field: React.FC<{
  label: string;
  children: React.ReactNode;
  copyValue?: string;
}> = ({ label, children, copyValue }) => {
  return (
    <div className="group relative">
      <div className="text-[10px] uppercase tracking-wide text-neutral-500 mb-1 font-medium">
        {label}
      </div>
      <div className="text-sm text-neutral-200/90 leading-relaxed whitespace-pre-wrap break-words pr-8">
        {children}
      </div>
      {copyValue && (
        <CopyButton
          value={copyValue}
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
        />
      )}
    </div>
  );
};

const CopyButton: React.FC<{ value: string; className?: string }> = ({
  value,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className={clsx(
        "inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-neutral-300 hover:text-white transition",
        className
      )}
      aria-label="Copy"
    >
      {copied ? (
        <Check className="size-3 text-brand-400" />
      ) : (
        <Copy className="size-3" />
      )}{" "}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const DetailsContent: React.FC<{
  example: PushExample;
  tab: TabId;
  codeSamples: { js: string; swift: string };
  onCopy: (v: string) => void;
}> = ({ example, tab, codeSamples, onCopy }) => {
  const c = example.config;
  switch (tab) {
    case "overview":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="Goal">{c.goal}</Field>
          <Field label="Summary">{example.body}</Field>
          <Field label="Key Metric">{c.successMetric}</Field>
        </div>
      );
    case "targeting":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="Audience">{c.audience}</Field>
          <Field label="Throttle">{c.throttle}</Field>
          <Field label="Fallback">{c.fallback}</Field>
        </div>
      );
    case "trigger":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="Trigger">{c.trigger}</Field>
          <Field
            label="Sample Payload"
            copyValue={`{\n  \"event\": \"${
              c.trigger.split(" ")[2] || c.trigger
            }\",\n  \"user_id\": \"user_123\"\n}`}
          >{`{ "event": "${
            c.trigger.split(" ")[2] || c.trigger
          }", "user_id": "user_123" }`}</Field>
          <Field label="Timing">{c.timing}</Field>
        </div>
      );
    case "message":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="Title Template" copyValue={example.title}>
            {example.title}
          </Field>
          <Field label="Body Template" copyValue={example.body}>
            {example.body}
          </Field>
          <Field label="Personalization Tokens">
            {c.personalizationTokens}
          </Field>
          <Field label="Preview">
            {example.title} – {example.body}
          </Field>
        </div>
      );
    case "delivery":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="Delivery Type">{c.deliveryType}</Field>
          <Field label="Timing Window">{c.timing}</Field>
          <Field label="Fallback Path">{c.fallback}</Field>
        </div>
      );
    case "experiments":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="A/B Test">{c.abTest}</Field>
          <Field label="Hypothesis">
            Variant A will outperform Variant B on{" "}
            {c.successMetric.toLowerCase()}.
          </Field>
        </div>
      );
    case "metrics":
      return (
        <div className="space-y-4 text-sm" role="tabpanel">
          <Field label="Primary Metric">{c.successMetric}</Field>
          <Field label="Secondary">Open rate, CTR, retention delta</Field>
          <div className="mt-4 rounded-md bg-neutral-900/50 p-3 border border-white/10">
            <p className="text-[11px] font-mono text-neutral-400 mb-2">
              Sample send calls
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                label="JavaScript"
                code={codeSamples.js}
                onCopy={onCopy}
              />
              <CodeBlock
                label="Swift"
                code={codeSamples.swift}
                onCopy={onCopy}
              />
            </div>
          </div>
        </div>
      );
  }
};

const CodeBlock: React.FC<{
  label: string;
  code: string;
  onCopy: (v: string) => void;
}> = ({ label, code, onCopy }) => {
  return (
    <div className="relative">
      <div className="absolute right-2 top-1 flex gap-2">
        <button
          onClick={() => onCopy(code)}
          className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] text-neutral-300 hover:text-white"
        >
          <Copy className="size-3" /> Copy
        </button>
      </div>
      <pre className="overflow-x-auto rounded-sm bg-neutral-950/80 p-3 text-[10px] leading-relaxed text-neutral-300 border border-white/5 font-mono whitespace-pre">
        <code>{code}</code>
      </pre>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-neutral-500">
        {label}
      </div>
    </div>
  );
};

export default PushExamplesSection;
