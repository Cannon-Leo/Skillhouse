"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  User,
  Terminal,
  Settings,
  Copy,
  Check,
  LogOut,
  ShieldCheck,
  Cpu,
  Key,
} from "lucide-react";
import { Overlay } from "../ui/Overlay";
import styles from "./UserProfileModal.module.css";

export interface UserProfileData {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
  provider?: "google" | "github";
  apiKey?: string;
}

export interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfileData | null;
  onSignOut?: () => void;
  initialTab?: "profile" | "cli" | "settings";
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignOut,
  initialTab = "profile",
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "cli" | "settings">(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [preferredRuntime, setPreferredRuntime] = useState("claude");
  const [autoSync, setAutoSync] = useState(true);
  const [telemetry, setTelemetry] = useState(false);

  if (!isOpen || !user) return null;

  const apiKey = user.apiKey || "sk_live_9f82d1c47a38910b";
  const syncCommand = `skillhouse sync --key ${apiKey} --runtime ${preferredRuntime}`;

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCmd = () => {
    navigator.clipboard?.writeText(syncCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-profile-title"
        onClick={(e) => e.stopPropagation()}
        data-testid="user-profile-modal"
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h2 id="user-profile-title" className={styles.title}>
              Developer Account
            </h2>
            <span className={styles.badge}>
              <ShieldCheck size={13} />
              {user.role || "Verified Developer"}
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className={styles.tabsContainer} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "profile"}
            className={`${styles.tabButton} ${activeTab === "profile" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={15} />
            Profile &amp; Stats
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "cli"}
            className={`${styles.tabButton} ${activeTab === "cli" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("cli")}
          >
            <Terminal size={15} />
            CLI &amp; API Keys
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "settings"}
            className={`${styles.tabButton} ${activeTab === "settings" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={15} />
            Account Preferences
          </button>
        </div>

        {/* Tab Content Body */}
        <div className={styles.contentBody}>
          {activeTab === "profile" && (
            <>
              {/* Profile Card */}
              <div className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={user.avatarUrl || "/figma/header_avatar_figma.png"}
                    alt={user.name}
                    width={64}
                    height={64}
                    className={styles.avatarImage}
                    unoptimized
                  />
                  <span className={styles.onlineDot} title="Online and synced" />
                </div>
                <div className={styles.profileInfo}>
                  <div className={styles.userNameRow}>
                    <h3 className={styles.userName}>{user.name}</h3>
                  </div>
                  <p className={styles.userEmail}>{user.email || "developer@skillhouse.ai"}</p>
                  <div className={styles.statsRow}>
                    <span className={styles.statItem}>
                      Auth: <span className={styles.statValue}>{user.provider === "github" ? "GitHub OAuth" : "Google OAuth"}</span>
                    </span>
                    <span>•</span>
                    <span className={styles.statItem}>
                      Workflows: <span className={styles.statValue}>14 installed</span>
                    </span>
                    <span>•</span>
                    <span className={styles.statItem}>
                      Status: <span className={styles.statValue}>Active Daemon</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected Services */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Connected Agent Ecosystem</h4>
                  <p className={styles.sectionSubtitle}>Active IDEs and command-line clients</p>
                </div>
                <div className={styles.servicesGrid}>
                  <div className={styles.serviceItem}>
                    <div className={styles.serviceLeft}>
                      <div className={styles.serviceIconWrapper}>
                        <Image
                          src="/figma/github_icon.png"
                          alt="GitHub"
                          width={18}
                          height={18}
                          unoptimized
                        />
                      </div>
                      <div className={styles.serviceDetails}>
                        <span className={styles.serviceName}>GitHub Account</span>
                        <span className={styles.serviceMeta}>Linked to @{user.name.toLowerCase().replace(/\s+/g, "")}</span>
                      </div>
                    </div>
                    <span className={styles.connectedStatus}>
                      <span className={styles.statusIndicatorDot} /> Connected
                    </span>
                  </div>

                  <div className={styles.serviceItem}>
                    <div className={styles.serviceLeft}>
                      <div className={styles.serviceIconWrapper}>
                        <Cpu size={18} />
                      </div>
                      <div className={styles.serviceDetails}>
                        <span className={styles.serviceName}>Claude Code CLI Daemon</span>
                        <span className={styles.serviceMeta}>v1.0.12 • Listening on local IPC</span>
                      </div>
                    </div>
                    <span className={styles.connectedStatus}>
                      <span className={styles.statusIndicatorDot} /> Synced
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "cli" && (
            <>
              {/* API Key Box */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Skillhouse Secret API Key</h4>
                  <p className={styles.sectionSubtitle}>Used by agent daemons to authenticate sync operations</p>
                </div>

                <div className={styles.terminalCard}>
                  <div className={styles.terminalTop}>
                    <span className={styles.terminalLabel}>
                      <Key size={12} style={{ display: "inline", marginRight: 4 }} />
                      Production Token (Restricted Read/Write)
                    </span>
                    <button
                      type="button"
                      className={styles.copyIconButton}
                      onClick={handleCopyKey}
                    >
                      {copiedKey ? <Check size={12} /> : <Copy size={12} />}
                      {copiedKey ? "Copied Key" : "Copy Key"}
                    </button>
                  </div>
                  <div className={styles.terminalRow}>
                    <span className={styles.terminalCommand}>{apiKey}</span>
                  </div>
                </div>
              </div>

              {/* CLI Sync Snippet */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>One-Line Terminal Sync</h4>
                  <p className={styles.sectionSubtitle}>Run this once in your terminal to synchronize all installed skills</p>
                </div>

                <div className={styles.terminalCard}>
                  <div className={styles.terminalTop}>
                    <span className={styles.terminalLabel}>Bash / Zsh Command</span>
                    <button
                      type="button"
                      className={styles.copyIconButton}
                      onClick={handleCopyCmd}
                    >
                      {copiedCmd ? <Check size={12} /> : <Copy size={12} />}
                      {copiedCmd ? "Copied Command" : "Copy Command"}
                    </button>
                  </div>
                  <div className={styles.terminalRow}>
                    <span className={styles.terminalCommand}>{syncCommand}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Runtime Preferences</h4>
                  <p className={styles.sectionSubtitle}>Configure target agent formats</p>
                </div>

                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>Default Agent Environment</span>
                    <span className={styles.settingHelp}>Target format for newly downloaded workflows</span>
                  </div>
                  <select
                    className={styles.selectInput}
                    value={preferredRuntime}
                    onChange={(e) => setPreferredRuntime(e.target.value)}
                  >
                    <option value="claude">Claude Code CLI</option>
                    <option value="cursor">Cursor IDE</option>
                    <option value="codex">OpenAI Codex</option>
                    <option value="antigravity">Antigravity 2.0</option>
                  </select>
                </div>

                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>Automatic Skill Sync</span>
                    <span className={styles.settingHelp}>Auto-update skills when authors publish revisions</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoSync}
                    className={styles.toggleSwitch}
                    onClick={() => setAutoSync(!autoSync)}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>

                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>Anonymous Benchmark Telemetry</span>
                    <span className={styles.settingHelp}>Share runtime benchmark latencies to improve community ratings</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={telemetry}
                    className={styles.toggleSwitch}
                    onClick={() => setTelemetry(!telemetry)}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.signOutButton}
            onClick={() => {
              onSignOut?.();
              onClose();
            }}
          >
            <LogOut size={14} />
            Sign out of Skillhouse
          </button>

          <button
            type="button"
            className={styles.saveButton}
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </Overlay>
  );
};
