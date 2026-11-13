"use client";

// The estimate PDF, for riders who need approval before they pay. A card
// beside the account card on /book/success. The deposit details only show
// when a deposit amount is passed in.

import { useState } from "react";
import DownloadIcon from "@/components/shared/DownloadIcon/DownloadIcon";
import styles from "./EstimateDownload.module.css";

type Props = {
  bookingId: string;
  depositMode?: boolean;
  depositPercent?: number | null;
  depositCents?: number | null;
  balanceCents?: number | null;
  totalCents?: number | null;
  currency?: string;
  depositDueDate?: string | null;
  balanceDueDate?: string | null;
};

function fmt(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function fmtDate(ymd: string) {
  try {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(y, m - 1, d));
  } catch {
    return ymd;
  }
}

export default function EstimateDownload({
  bookingId,
  depositMode,
  depositPercent,
  depositCents,
  balanceCents,
  currency = "USD",
  depositDueDate,
  balanceDueDate,
}: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      if (depositMode && depositPercent) {
        params.set("depositPercent", String(depositPercent));
        if (depositCents != null)
          params.set("depositCents", String(depositCents));
        if (balanceCents != null)
          params.set("balanceCents", String(balanceCents));
        if (depositDueDate) params.set("depositDueDate", depositDueDate);
        if (balanceDueDate) params.set("balanceDueDate", balanceDueDate);
      }
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/estimate/${bookingId}/download${query}`);
      if (!res.ok) throw new Error("Failed to generate estimate");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `estimate-${bookingId.slice(0, 8).toUpperCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(true);
    } finally {
      setIsDownloading(false);
    }
  }

  const hasDeposit =
    depositMode && depositPercent && depositCents != null && depositCents > 0;
  const hasBalance = balanceCents != null && balanceCents > 0;

  return (
    <div className={styles.card}>
      <p className={styles.title}>Need approval first?</p>
      <p className={styles.copy}>
        Download a price estimate to share with your team or company before you
        pay.
      </p>

      <p className={styles.small}>
        This estimate isn&apos;t binding and the final price may change. Your
        invoice comes once payment is complete.
      </p>

      {hasDeposit && (
        <div className={styles.deposit}>
          <p>
            <strong>Deposit option included.</strong> Pay a {depositPercent}%
            deposit of {fmt(depositCents!, currency)} now
            {hasBalance ? (
              <> and the {fmt(balanceCents!, currency)} balance later</>
            ) : null}
            , or the full amount up front.
          </p>
          {depositDueDate && (
            <p>
              <strong>Deposit due:</strong> {fmtDate(depositDueDate)}
            </p>
          )}
          {hasBalance && balanceDueDate && (
            <p>
              <strong>Balance due:</strong> {fmtDate(balanceDueDate)}
            </p>
          )}
          <p className={styles.small}>Both options are in the PDF.</p>
        </div>
      )}

      <div className={styles.actions}>
        <button
          type='button'
          onClick={handleDownload}
          disabled={isDownloading}
          className={styles.btn}
          aria-busy={isDownloading}
        >
          {isDownloading ? "Preparing PDF…" : "Download estimate"}
          <span className={styles.box} aria-hidden='true'>
            {isDownloading ? (
              <span className={styles.spinner} />
            ) : (
              <DownloadIcon className={styles.icon} />
            )}
          </span>
        </button>
      </div>

      {error ? (
        <p className={styles.error} role='alert'>
          We couldn&apos;t make the PDF just now. Try again, or call dispatch
          and we&apos;ll email it to you.
        </p>
      ) : null}
    </div>
  );
}
