"use client";

import {
  IconCircleCheck,
  IconMoodEmpty,
  IconMoodHappy,
  IconMoodSad,
  IconMoodSmile,
  IconMoodAnnoyed,
  IconSend,
} from "@tabler/icons-react";
import { useState } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { FormCard, FormPanel } from "./FormCard";
import { iconProps } from "./icon";

/*
 * Feedback — no Figma frame. A five-step rating, what the feedback is about,
 * and a message. Sent once the feedback endpoint exists.
 */

const RATINGS = [
  { value: 1, label: "Very unhappy", icon: <IconMoodSad {...iconProps(20)} /> },
  { value: 2, label: "Unhappy", icon: <IconMoodAnnoyed {...iconProps(20)} /> },
  { value: 3, label: "Neutral", icon: <IconMoodEmpty {...iconProps(20)} /> },
  { value: 4, label: "Happy", icon: <IconMoodSmile {...iconProps(20)} /> },
  { value: 5, label: "Very happy", icon: <IconMoodHappy {...iconProps(20)} /> },
] as const;

const TOPICS = ["Dashboard", "Orders", "Verification files", "Reports", "Billing", "Chrome Extension", "Other"] as const;

export function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [topics, setTopics] = useState<readonly string[]>([]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <FormCard id="thanks" title="Thank You">
        <FormPanel>
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse">
              <IconCircleCheck {...iconProps(20)} />
            </span>
            <p className="text-body-s text-app-text">
              Your feedback is saved here and reaches the product team once the feedback service is connected.
            </p>
          </div>
        </FormPanel>
      </FormCard>
    );
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (rating !== null && message.trim()) setSent(true);
      }}
    >
      <FormCard id="rating" title="How is VerifyEngine working for you?">
        <FormPanel>
          <div role="radiogroup" aria-label="Rating" className="flex flex-wrap gap-2">
            {RATINGS.map((item) => {
              const active = rating === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRating(item.value)}
                  className={`flex min-w-24 flex-1 flex-col items-center gap-2 rounded-app-l border-w-2xs px-3 py-4 transition-colors ${
                    active
                      ? "border-app-line-brand1 bg-app-brand1 text-app-text-inverse"
                      : "border-app-line bg-app-fade-40 text-app-text hover:bg-app-fade-48"
                  }`}
                >
                  {item.icon}
                  <span className="text-label-2xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </FormPanel>
      </FormCard>

      <FormCard id="details" title="Tell Us More">
        <FormPanel label="About">
          <div className="flex flex-wrap gap-1">
            {TOPICS.map((topic) => {
              const active = topics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setTopics((current) =>
                      active ? current.filter((value) => value !== topic) : [...current, topic],
                    )
                  }
                  className={`rounded-app-7xl border-w-2xs px-4 py-2 text-label-2xs transition-colors ${
                    active
                      ? "border-app-line-brand1 bg-app-brand1 text-app-text-inverse"
                      : "border-app-line bg-app-fade-48 text-app-text hover:bg-app-fade-40"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="feedback-message" className="flex items-center gap-0.5 px-3 text-label-2xs text-app-text">
              Your feedback <span className="text-app-warning">*</span>
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={6}
              placeholder="What works well, what gets in the way, what you would add..."
              className="resize-y rounded-app-l border-w-xs border-app-line bg-app-surface p-3 text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
            />
          </div>
          <ConsentCheckbox>The product team may contact me about this feedback.</ConsentCheckbox>
        </FormPanel>
        <button
          type="submit"
          disabled={rating === null || !message.trim()}
          className="flex items-center justify-center gap-3 self-start rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconSend {...iconProps(20)} />
          <span className="text-label-xs">Send Feedback</span>
        </button>
      </FormCard>
    </form>
  );
}
