"use client";

import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

interface AuditModalTriggerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function AuditModalTrigger({ className, style, children }: AuditModalTriggerProps) {
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("open-audit-modal"));
      }}
      className={className}
      style={style}
    >
      {children || (
        <>
          Claim Free Audit
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            <RiArrowRightLine size={16} />
          </span>
        </>
      )}
    </Link>
  );
}
