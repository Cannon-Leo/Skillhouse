import React, { useState } from "react";
import { Mic, Paperclip, ArrowUp, Copy, Save, RefreshCw, Scissors, Maximize2, Check, Zap, Loader2 } from "lucide-react";
import styles from "./SkillPlayground.module.css";
import { Button } from "@/components/ui/Button";

export const SkillPlayground = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cached, setCached] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAction = async (action: "shorten" | "lengthen" | "rewrite" | "generate") => {
    if (!text && action !== "generate") {
      setText("Draft a clean, production-ready AI workflow for automated daily standup reports.");
      return;
    }

    setLoading(true);
    setCopied(false);
    setSaved(false);

    try {
      const res = await fetch("/api/skills/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, input: text }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        setCached(Boolean(data.cached));
      } else if (data.error) {
        setResult(`Error: ${data.error}`);
      }
    } catch {
      setResult("Network error contacting AI generation endpoint.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>
          Drop in your notes or a few rough sentences — then tap &quot;Rewrite&quot; to polish it up, or hit &quot;Generate&quot; to let Isang craft something from scratch. Need it shorter or longer? Use the &quot;Shorten&quot; or &quot;Lengthen&quot; options and we will handle the rest.
        </p>
      </div>

      <div className={styles.playground}>
        <div className={styles.quickActions}>
          <button 
            className={styles.actionChip} 
            onClick={() => handleAction("shorten")}
            disabled={loading}
          >
            <Scissors size={14} /> Shorten
          </button>
          <button 
            className={styles.actionChip} 
            onClick={() => handleAction("lengthen")}
            disabled={loading}
          >
            <Maximize2 size={14} /> Lengthen
          </button>
          <button 
            className={styles.actionChip} 
            onClick={() => handleAction("rewrite")}
            disabled={loading}
          >
            <RefreshCw size={14} /> Re-write
          </button>
          <button 
            className={styles.actionChip} 
            onClick={() => handleAction("generate")}
            disabled={loading}
          >
            <RefreshCw size={14} /> Generate
          </button>
        </div>

        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Type notes or prompt instructions here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
            disabled={loading}
          />
          <div className={styles.footer}>
            <span className={styles.charCount}>{text.length}/300 characters</span>
            <div className={styles.tools}>
              <button className={styles.toolBtn} aria-label="Attach file" type="button">
                <Paperclip size={18} />
              </button>
              <button className={styles.toolBtn} aria-label="Voice record" type="button">
                <Mic size={18} />
              </button>
              <button 
                className={styles.submitBtn} 
                aria-label="Submit" 
                type="button"
                onClick={() => handleAction("generate")}
                disabled={loading}
              >
                {loading ? <Loader2 size={16} className={styles.loadingSpinner} /> : <ArrowUp size={16} />}
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className={styles.resultBox}>
            {cached && (
              <div className={styles.cacheBadge}>
                <Zap size={12} /> Prompt Cached (Low Latency)
              </div>
            )}
            <div>{result}</div>
          </div>
        )}

        <div className={styles.resultActions}>
          <Button 
            variant="outline" 
            size="sm" 
            className={styles.resultBtn} 
            onClick={handleCopy}
            disabled={!result}
          >
            {copied ? <Check size={14} color="#03A400" /> : <Copy size={14} />} 
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={styles.resultBtn} 
            onClick={handleSave}
            disabled={!result}
          >
            {saved ? <Check size={14} color="#03A400" /> : <Save size={14} />} 
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
