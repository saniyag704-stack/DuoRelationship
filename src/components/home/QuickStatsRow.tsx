"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { ScanEye, Send, ShieldCheck, Flame, History } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function QuickStatsRow() {
  const { state, hasRealActivity, setActiveTab } = useRelationship();
  const { totalDecodes, totalRewrites, deEscalatedMoments, currentStreakDays } = state.stats;

  const statItems = [
    {
      label: "Chats Decoded",
      value: totalDecodes,
      sub: "Psych X-Ray insights",
      icon: ScanEye,
      color: "text-gold-400",
      tab: "decode" as const,
    },
    {
      label: "Messages Softened",
      value: totalRewrites,
      sub: "Before You Send",
      icon: Send,
      color: "text-rose-400",
      tab: "rewrite" as const,
    },
    {
      label: "Moments De-escalated",
      value: deEscalatedMoments,
      sub: "Defensiveness averted",
      icon: ShieldCheck,
      color: "text-emerald-400",
      tab: "decode" as const,
    },
    {
      label: "Mindful Streak",
      value: currentStreakDays > 0 ? `${currentStreakDays}d` : "0d",
      sub: "Daily attunement",
      icon: Flame,
      color: "text-amber-400",
      tab: "home" as const,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="cursor-pointer group rounded-xl bg-obsidian-900/80 border border-gold-500/15 p-3.5 hover:border-gold-500/35 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {item.label}
                </span>
                <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
                {item.value}
              </div>
              <p className="text-[10px] text-zinc-400 mt-0.5">{item.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Log (Only shows when real activity has occurred) */}
      {hasRealActivity && state.activities.length > 0 && (
        <div className="rounded-xl bg-obsidian-900/60 border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-gold-400" />
              Recent Emotional Calibrations
            </span>
            <span className="text-[11px] text-zinc-400">
              {state.activities.length} total logged
            </span>
          </div>

          <div className="space-y-2">
            {state.activities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-obsidian-850/60 border border-white/5 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-200">{act.title}</span>
                    {act.metricsContribution.deEscalated && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                        De-escalated
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5 line-clamp-1">
                    {act.summary}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0">
                  {formatDate(act.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
