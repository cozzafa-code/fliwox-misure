// ============================================================
// fliwoX Misure — Logo ufficiale (da fliwox-icon.svg)
// ============================================================

import type { CSSProperties } from 'react';

interface Props {
  size?: number;
  textSize?: number;
  style?: CSSProperties;
  textColor?: string;
}

/**
 * LogoCompact: solo il quadratino teal con X bianca (per topbar mobile)
 */
export function LogoCompact({ size = 26, style }: Props) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.23,
        background: '#2FA7A2',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 7 L17 17"
          stroke="#F2F1EC"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M17 7 L7 17"
          stroke="#F2F1EC"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * LogoBrand: testo "fliwo" + box X (per topbar)
 */
export function LogoBrand({ textSize = 18, textColor = '#FFFFFF' }: Props) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span
        style={{
          fontSize: textSize,
          fontWeight: 800,
          letterSpacing: -0.5,
          color: textColor,
        }}
      >
        fliwo
      </span>
      <LogoCompact size={textSize * 1.45} />
    </span>
  );
}
