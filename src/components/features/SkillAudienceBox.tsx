"use client";

import React, { useState } from "react";
import { Pill } from "../ui/Pill";
import styles from "./SkillAudienceBox.module.css";

export interface SkillAudienceBoxProps {
  label?: string;
  roles?: string[];
  lastUpdated?: string;
  onRoleClick?: (role: string) => void;
  className?: string;
}

export const SkillAudienceBox: React.FC<SkillAudienceBoxProps> = ({
  label = "This skill is often used by",
  roles = ["Product Manager", "Graphic Designer", "Art Director"],
  lastUpdated = "Last updated Oct 3, 2026",
  onRoleClick,
  className = "",
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleClick = (role: string) => {
    setSelectedRole(selectedRole === role ? null : role);
    onRoleClick?.(role);
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      aria-label="Target audience roles"
    >
      <div className={styles.contentRow}>
        <span className={styles.label}>{label}</span>
        <div className={styles.pillsRow}>
          {roles.map((role) => (
            <Pill
              key={role}
              isSelected={selectedRole === role}
              onClick={() => handleRoleClick(role)}
            >
              {role}
            </Pill>
          ))}
        </div>
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      <span className={styles.updatedText}>{lastUpdated}</span>
    </div>
  );
};
