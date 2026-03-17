/* ═══════════════════════════════════════════════════════
   ApixelLogo — Pixel "A" mark + wordmark
   Ported from Brand Book
   ═══════════════════════════════════════════════════════ */

// Pixel "A" mark — 6 columns × 7 rows
const PIXEL_MAP = [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
];

const PIXEL_SIZE = 8;
const PIXEL_GAP = 2;
const STEP = PIXEL_SIZE + PIXEL_GAP;
const MARK_W = 6 * STEP - PIXEL_GAP;
const MARK_H = 7 * STEP - PIXEL_GAP;

type Variant = 'red' | 'black' | 'white';

interface ApixelLogoProps {
    variant?: Variant;
    markSize?: number;
    showWordmark?: boolean;
    className?: string;
}

const COLOR_MAP: Record<Variant, { mark: string; text: string }> = {
    red: { mark: '#D22828', text: '#000000' },
    black: { mark: '#000000', text: '#000000' },
    white: { mark: '#FFFFFF', text: '#FFFFFF' },
};

export function ApixelLogo({
    variant = 'red',
    markSize = 40,
    showWordmark = true,
    className = '',
}: ApixelLogoProps) {
    const scale = markSize / MARK_H;
    const scaledW = MARK_W * scale;
    const scaledH = MARK_H * scale;
    const { mark, text } = COLOR_MAP[variant];

    return (
        <div
            className={className}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
            {/* Pixel Mark */}
            <svg
                width={scaledW}
                height={scaledH}
                viewBox={`0 0 ${MARK_W} ${MARK_H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {PIXEL_MAP.map((row, r) =>
                    row.map((filled, c) =>
                        filled ? (
                            <rect
                                key={`${r}-${c}`}
                                x={c * STEP}
                                y={r * STEP}
                                width={PIXEL_SIZE}
                                height={PIXEL_SIZE}
                                fill={mark}
                            />
                        ) : null
                    )
                )}
            </svg>

            {/* Wordmark */}
            {showWordmark && (
                <span
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: markSize * 0.72,
                        color: text,
                        letterSpacing: '0.05em',
                        lineHeight: 1,
                    }}
                >
                    APIXEL
                </span>
            )}
        </div>
    );
}
