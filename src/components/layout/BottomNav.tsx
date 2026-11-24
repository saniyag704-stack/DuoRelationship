"use client";

import React from "react";
import { useRelationship } from "@/context/RelationshipContext";
import { TabType } from "@/types";
import { Compass, ScanEye, Send, Sparkles } from "lucide-react";

interface NavItem {
  id: TabType;
  label: string;
  sub: string;
  icon: React.ElementType;
  badge?: string;
}

export function BottomNav() {
  const { activeTab, setActiveTab, state } = useRelationship();

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      sub: "Pulse & Habit",
      icon: Compass,
      badge: !state.dailyHabit.completed ? "Today" : undefined,
    },
    {
      id: "decode",
      label: "Decode",
      sub: "Psych X-Ray",
      icon: ScanEye,
    },
    {
      id: "rewrite",
      label: "Before You Send",
      sub: "De-escalate",
      icon: Send,
    },
    {
      id: "sync",
      label: "Spark & Sync",
      sub: "Love DNA",
      icon: Sparkles,
      badge: state.unlockedVibeCards.length > 0 ? `${state.unlockedVibeCards.length}` : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/90 backdrop-blur-2xl border-t border-gold-500/15 py-2 px-3 sm:px-6">
      <div className="max-w-xl mx-auto flex items-center justify-around gap-1 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 sm:px-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "text-gold-300"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
              }`}
            >
              {/* Active glow background pill */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/15 via-rose-500/10 to-transparent rounded-2xl border border-gold-500/25 shadow-gold-glow/10 -z-10" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110 text-gold-400" : "group-hover:scale-105"
                  }`}
                />
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-2 text-[9px] font-semibold px-1 py-0.2 rounded-full leading-tight border ${
                      item.badge === "Today"
                        ? "bg-rose-500/25 border-rose-400/40 text-rose-300"
                        : "bg-gold-500/20 border-gold-400/40 text-gold-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] sm:text-xs font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? "text-gold-200 font-semibold" : "text-zinc-400"
                }`}
              >
                {item.label}
              </span>

              <span className="text-[9px] text-zinc-400 hidden xs:block font-light">
                {item.sub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
