import React, { useState } from "react";
import { Mic, Paperclip, ArrowUp, Copy, Save, RefreshCw, Scissors, Maximize2 } from "lucide-react";
import styles from "./SkillPlayground.module.css";
import { Button } from "@/components/ui/Button";

export const SkillPlayground = () => {
  const [text, setText] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>
          Drop in your notes or a few rough sentences — then tap &quot;Rewrite&quot; to polish it up, or hit &quot;Generate&quot; to let Isang craft something from scratch. Need it shorter or longer? Use the &quot;Shorten&quot; or &quot;Lengthen&quot; options and we will handle the rest.
        </p>
      </div>

      <div className={styles.playground}>
        <div className={styles.quickActions}>
          <button className={styles.actionChip}><Scissors size={14} /> Shorten</button>
          <button className={styles.actionChip}><Maximize2 size={14} /> Lengthen</button>
          <button className={styles.actionChip}><RefreshCw size={14} /> Re-write</button>
          <button className={styles.actionChip}><RefreshCw size={14} /> Generate</button>
        </div>

        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
          />
          <div className={styles.footer}>
            <span className={styles.charCount}>{text.length}/300 characters</span>
            <div className={styles.tools}>
              <button className={styles.toolBtn} aria-label="Attach file">
                <Paperclip size={18} />
              </button>
              <button className={styles.toolBtn} aria-label="Voice record">
                <Mic size={18} />
              </button>
              <button className={styles.submitBtn} aria-label="Submit">
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultActions}>
          <Button variant="outline" size="sm" className={styles.resultBtn}>
            <Copy size={14} /> Copy
          </Button>
          <Button variant="outline" size="sm" className={styles.resultBtn}>
            <Save size={14} /> Save
          </Button>
        </div>
      </div>
    </div>
  );
};
