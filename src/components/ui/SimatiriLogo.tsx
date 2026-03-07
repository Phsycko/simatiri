// Simatiri Logo component — replica of the official brand logo
// Deer head silhouette + SIMATIRI bold serif + Experience script
export function SimatiriLogo({
    variant = 'dark',
    className = ''
}: {
    variant?: 'dark' | 'light' | 'white'
    className?: string
}) {
    const textColor = variant === 'white' ? '#FFFFFF'
        : variant === 'light' ? '#FFFFFF'
            : '#1a4a1a'  // forest green

    const subColor = variant === 'white' ? 'rgba(255,255,255,0.85)'
        : variant === 'light' ? 'rgba(255,255,255,0.85)'
            : '#2d6a2d'

    const deerColor = variant === 'white' ? '#FFFFFF'
        : variant === 'light' ? 'rgba(255,255,255,0.9)'
            : '#3d1a0a'  // dark brown

    return (
        <svg
            viewBox="0 0 280 120"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="SIMATIRI Experience"
            fill="none"
        >
            {/* DEER HEAD + ANTLERS */}
            <g transform="translate(100, 2) scale(0.5)">
                {/* Main antler left */}
                <path d="M80 60 C75 50 65 35 55 20 C50 12 42 5 35 8 C30 10 32 18 38 22 C32 18 25 22 28 30 C22 26 16 30 20 38 C26 32 34 34 40 40 C34 38 30 44 34 50 C40 44 48 44 52 50 C48 44 52 36 58 38" stroke={deerColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Main antler right */}
                <path d="M120 60 C125 50 135 35 145 20 C150 12 158 5 165 8 C170 10 168 18 162 22 C168 18 175 22 172 30 C178 26 184 30 180 38 C174 32 166 34 160 40 C166 38 170 44 166 50 C160 44 152 44 148 50 C152 44 148 36 142 38" stroke={deerColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Neck */}
                <path d="M80 60 Q100 55 120 60 L125 90 Q125 110 100 115 Q75 110 75 90 Z" fill={deerColor} />
                {/* Head */}
                <ellipse cx="100" cy="75" rx="24" ry="20" fill={deerColor} />
                {/* Nose/Muzzle */}
                <ellipse cx="100" cy="92" rx="14" ry="10" fill={deerColor} />
                {/* Eyes */}
                <ellipse cx="90" cy="72" rx="3.5" ry="3" fill="white" opacity="0.9" />
                <ellipse cx="110" cy="72" rx="3.5" ry="3" fill="white" opacity="0.9" />
                <circle cx="90" cy="72" r="1.8" fill={deerColor === '#FFFFFF' ? '#3d1a0a' : deerColor} />
                <circle cx="110" cy="72" r="1.8" fill={deerColor === '#FFFFFF' ? '#3d1a0a' : deerColor} />
                {/* Nostrils */}
                <ellipse cx="95" cy="94" rx="2.5" ry="2" fill={deerColor === '#3d1a0a' ? '#5c2a14' : 'rgba(0,0,0,0.2)'} />
                <ellipse cx="105" cy="94" rx="2.5" ry="2" fill={deerColor === '#3d1a0a' ? '#5c2a14' : 'rgba(0,0,0,0.2)'} />
                {/* Ears */}
                <path d="M78 68 C72 58 68 52 72 48 C76 46 82 54 82 64" fill={deerColor} />
                <path d="M122 68 C128 58 132 52 128 48 C124 46 118 54 118 64" fill={deerColor} />
            </g>

            {/* SIMATIRI text */}
            <text
                x="140"
                y="85"
                textAnchor="middle"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="36"
                fontWeight="900"
                letterSpacing="3"
                fill={textColor}
            >
                SIMATIRI
            </text>

            {/* Experience script text */}
            <text
                x="178"
                y="103"
                textAnchor="middle"
                fontFamily="'Brush Script MT', 'Dancing Script', cursive, Georgia"
                fontSize="20"
                fontWeight="400"
                fontStyle="italic"
                fill={subColor}
            >
                Experience
            </text>
        </svg>
    )
}
