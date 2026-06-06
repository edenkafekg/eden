"use client";

type ToyProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function Balloon({ className = "", style }: ToyProps) {
  return (
    <svg
      viewBox="0 0 60 100"
      className={`eden-toy eden-float ${className}`}
      style={style}
      aria-hidden
    >
      <line x1="30" y1="55" x2="30" y2="95" stroke="#385333" strokeWidth="2" />
      <ellipse cx="30" cy="35" rx="22" ry="28" fill="currentColor" />
      <ellipse cx="24" cy="28" rx="6" ry="8" fill="white" opacity="0.35" />
      <polygon points="22,52 30,58 38,52" fill="currentColor" />
    </svg>
  );
}

export function IceCream({ className = "", style }: ToyProps) {
  return (
    <svg
      viewBox="0 0 70 100"
      className={`eden-toy eden-wiggle ${className}`}
      style={style}
      aria-hidden
    >
      <polygon points="35,95 10,45 60,45" fill="#c9a227" stroke="#385333" strokeWidth="1.5" />
      <line x1="20" y1="55" x2="28" y2="75" stroke="#8e3232" strokeWidth="1.5" opacity="0.5" />
      <line x1="35" y1="48" x2="35" y2="78" stroke="#8e3232" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="55" x2="42" y2="75" stroke="#8e3232" strokeWidth="1.5" opacity="0.5" />
      <circle cx="35" cy="30" r="22" fill="#8e3232" />
      <circle cx="22" cy="22" r="14" fill="#fde8d4" />
      <circle cx="48" cy="24" r="12" fill="#385333" opacity="0.7" />
      <circle cx="35" cy="12" r="8" fill="#fff7ed" />
    </svg>
  );
}

export function TeddyBear({ className = "", style }: ToyProps) {
  return (
    <svg
      viewBox="0 0 90 90"
      className={`eden-toy eden-bounce-slow ${className}`}
      style={style}
      aria-hidden
    >
      <circle cx="22" cy="22" r="14" fill="#c9a227" />
      <circle cx="68" cy="22" r="14" fill="#c9a227" />
      <circle cx="45" cy="48" r="32" fill="#c9a227" />
      <ellipse cx="45" cy="72" rx="22" ry="16" fill="#b8922a" />
      <circle cx="34" cy="44" r="5" fill="#385333" />
      <circle cx="56" cy="44" r="5" fill="#385333" />
      <circle cx="35" cy="43" r="1.5" fill="#fff7ed" />
      <circle cx="57" cy="43" r="1.5" fill="#fff7ed" />
      <ellipse cx="45" cy="52" rx="6" ry="4" fill="#8e3232" />
      <path d="M38 56 Q45 62 52 56" stroke="#385333" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Doll({ className = "", style }: ToyProps) {
  return (
    <svg
      viewBox="0 0 70 100"
      className={`eden-toy eden-sway ${className}`}
      style={style}
      aria-hidden
    >
      <circle cx="35" cy="18" r="14" fill="#fde8d4" stroke="#385333" strokeWidth="1.5" />
      <path d="M22 14 Q35 6 48 14" fill="#8e3232" />
      <circle cx="30" cy="18" r="2" fill="#385333" />
      <circle cx="40" cy="18" r="2" fill="#385333" />
      <path d="M32 24 Q35 27 38 24" stroke="#8e3232" strokeWidth="1.5" fill="none" />
      <rect x="22" y="32" width="26" height="30" rx="8" fill="#8e3232" />
      <line x1="35" y1="32" x2="35" y2="62" stroke="#fff7ed" strokeWidth="2" opacity="0.4" />
      <line x1="14" y1="40" x2="22" y2="48" stroke="#fde8d4" strokeWidth="6" strokeLinecap="round" />
      <line x1="56" y1="40" x2="48" y2="48" stroke="#fde8d4" strokeWidth="6" strokeLinecap="round" />
      <line x1="28" y1="62" x2="24" y2="88" stroke="#385333" strokeWidth="7" strokeLinecap="round" />
      <line x1="42" y1="62" x2="46" y2="88" stroke="#385333" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function ToyBlocks({ className = "", style }: ToyProps) {
  return (
    <svg
      viewBox="0 0 90 70"
      className={`eden-toy eden-spin-slow ${className}`}
      style={style}
      aria-hidden
    >
      <rect x="5" y="30" width="28" height="28" rx="4" fill="#8e3232" transform="rotate(-8 19 44)" />
      <text x="14" y="50" fill="white" fontSize="16" fontWeight="bold" transform="rotate(-8 19 44)">
        A
      </text>
      <rect x="32" y="18" width="28" height="28" rx="4" fill="#385333" transform="rotate(6 46 32)" />
      <text x="41" y="38" fill="white" fontSize="16" fontWeight="bold" transform="rotate(6 46 32)">
        B
      </text>
      <rect x="52" y="32" width="28" height="28" rx="4" fill="#c9a227" transform="rotate(-4 66 46)" />
      <text x="61" y="52" fill="white" fontSize="16" fontWeight="bold" transform="rotate(-4 66 46)">
        C
      </text>
    </svg>
  );
}

export function Star({ className = "", style }: ToyProps) {
  return (
    <svg viewBox="0 0 40 40" className={`eden-toy eden-twinkle ${className}`} style={style} aria-hidden>
      <polygon
        points="20,2 24,14 37,14 27,22 31,35 20,27 9,35 13,22 3,14 16,14"
        fill="#c9a227"
      />
    </svg>
  );
}

export function ConfettiDot({ className = "", style }: ToyProps) {
  return (
    <span
      className={`eden-confetti inline-block rounded-full ${className}`}
      style={style}
      aria-hidden
    />
  );
}

type FloatingToysProps = {
  variant?: "hero" | "section" | "full";
};

export function FloatingToys({ variant = "hero" }: FloatingToysProps) {
  if (variant === "section") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Balloon className="absolute left-[4%] top-[8%] h-14 w-14 text-eden-accent opacity-70" style={{ animationDelay: "0s" }} />
        <Star className="absolute right-[8%] top-[12%] h-8 w-8 opacity-80" style={{ animationDelay: "1s" }} />
        <IceCream className="absolute bottom-[10%] right-[5%] h-16 w-16 opacity-75" style={{ animationDelay: "0.5s" }} />
        <ToyBlocks className="absolute bottom-[15%] left-[6%] h-12 w-16 opacity-70" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Balloon className="absolute left-[2%] top-[6%] h-16 w-16 text-eden-accent sm:h-20 sm:w-20" style={{ animationDelay: "0s" }} />
      <Balloon className="absolute left-[12%] top-[28%] h-12 w-12 text-eden-headline opacity-80" style={{ animationDelay: "1.2s" }} />
      <Balloon className="absolute right-[4%] top-[4%] h-14 w-14 text-[#c9a227] sm:h-18 sm:w-18" style={{ animationDelay: "0.6s" }} />
      <Balloon className="absolute right-[14%] top-[32%] h-10 w-10 text-eden-accent opacity-70" style={{ animationDelay: "2s" }} />

      <IceCream className="eden-drift absolute right-[2%] top-[48%] h-20 w-20 opacity-90 sm:h-24 sm:w-24" style={{ animationDelay: "0.3s" }} />
      <TeddyBear className="absolute bottom-[8%] left-[3%] h-16 w-16 opacity-90 sm:h-20 sm:w-20" style={{ animationDelay: "0.8s" }} />
      <Doll className="eden-drift-reverse absolute bottom-[18%] right-[8%] h-20 w-20 opacity-85 sm:h-24 sm:w-24" style={{ animationDelay: "1.5s" }} />
      <ToyBlocks className="absolute left-[18%] bottom-[6%] h-14 w-20 opacity-80" />

      <Star className="absolute left-[45%] top-[3%] h-6 w-6" style={{ animationDelay: "0s" }} />
      <Star className="absolute left-[55%] top-[12%] h-5 w-5 opacity-70" style={{ animationDelay: "1.4s" }} />
      <Star className="absolute right-[30%] top-[18%] h-7 w-7" style={{ animationDelay: "0.7s" }} />
      <Star className="absolute left-[30%] top-[20%] h-5 w-5 opacity-60" style={{ animationDelay: "2.2s" }} />

      <ConfettiDot className="eden-fall absolute left-[8%] top-0 h-3 w-3 bg-eden-accent" style={{ animationDelay: "0s", animationDuration: "6s" }} />
      <ConfettiDot className="eden-fall absolute left-[22%] top-0 h-2 w-2 bg-eden-headline" style={{ animationDelay: "1.5s", animationDuration: "7s" }} />
      <ConfettiDot className="eden-fall absolute left-[40%] top-0 h-3 w-3 bg-[#c9a227]" style={{ animationDelay: "3s", animationDuration: "5.5s" }} />
      <ConfettiDot className="eden-fall absolute left-[65%] top-0 h-2 w-2 bg-eden-accent" style={{ animationDelay: "0.8s", animationDuration: "6.5s" }} />
      <ConfettiDot className="eden-fall absolute left-[80%] top-0 h-3 w-3 bg-eden-headline" style={{ animationDelay: "2.5s", animationDuration: "7.5s" }} />
      <ConfettiDot className="eden-fall absolute left-[92%] top-0 h-2 w-2 bg-[#c9a227]" style={{ animationDelay: "4s", animationDuration: "6s" }} />

      {variant === "full" && (
        <>
          <Balloon className="absolute left-[70%] bottom-[25%] h-11 w-11 text-eden-headline opacity-60" style={{ animationDelay: "3s" }} />
          <TeddyBear className="absolute right-[20%] bottom-[4%] h-14 w-14 opacity-70" style={{ animationDelay: "2s" }} />
        </>
      )}
    </div>
  );
}
