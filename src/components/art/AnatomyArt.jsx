/**
 * Original, licence-free editorial line artwork drawn for this project.
 * No anatomical illustration implies a specific patient, procedure, or outcome.
 */

function Svg({ children, viewBox = '0 0 240 260', className = '' }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function BrainProfile({ className = '' }) {
  return (
    <Svg className={className}>
      <g strokeWidth="1.1" opacity="0.9">
        <path d="M119 34C94 26 67 40 60 64C39 70 30 96 44 113C28 128 31 155 53 165C55 188 82 201 106 189C124 207 157 202 169 181C193 174 201 146 185 128C199 110 190 82 168 76C158 52 137 38 119 34Z" />
        <path d="M167 178C185 175 200 189 197 206C181 219 160 215 151 198" />
        <path d="M133 188C133 207 128 224 137 241" />
        <path d="M147 187C151 207 147 224 155 238" />
        <path d="M78 70C94 76 107 69 114 56" />
        <path d="M65 93C90 101 113 91 127 76" />
        <path d="M51 117C77 125 107 117 128 101" />
        <path d="M55 143C81 151 109 142 129 124" />
        <path d="M71 166C95 174 121 167 144 148" />
        <path d="M112 55C124 66 144 68 158 58" />
        <path d="M126 100C136 111 154 113 168 106" />
        <path d="M128 124C139 134 157 133 171 124" />
        <path d="M144 148C155 157 172 154 181 144" />
        <path d="M113 188C124 183 138 185 147 194" />
        <path d="M92 200C100 208 114 211 123 207" />
        <path d="M185 128C174 137 177 153 188 160" />
        <path d="M60 64C69 54 84 48 98 50" />
      </g>
      <g strokeWidth="0.7" opacity="0.45">
        <path d="M24 60H44M24 60V80M216 200H196M216 200V180" />
        <path d="M120 14V25M120 246V258M10 130H21M219 130H230" />
        <circle cx="120" cy="130" r="2" fill="currentColor" stroke="none" />
      </g>
    </Svg>
  );
}

export function SpineColumn({ className = '' }) {
  const vertebrae = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Svg viewBox="0 0 200 340" className={className}>
      <g strokeWidth="1.05">
        <path d="M85 18C72 60 74 100 88 138C99 170 102 208 92 244C84 276 88 304 100 326" opacity="0.55" />
        <path d="M116 18C128 60 124 100 111 138C100 170 98 208 108 244C116 276 112 304 101 326" opacity="0.55" />
        {vertebrae.map((index) => {
          const y = 30 + index * 26;
          const width = 46 + Math.sin(index * 0.9) * 7;
          return (
            <g key={index} opacity={0.9 - index * 0.025}>
              <path
                d={`M${100 - width / 2} ${y}C${100 - width / 2 - 5} ${y + 4} ${100 - width / 2 - 7} ${y + 13} ${100 - width / 2 + 3} ${y + 17}C${100 - 12} ${y + 20} ${100 + 12} ${y + 20} ${100 + width / 2 - 3} ${y + 17}C${100 + width / 2 + 7} ${y + 13} ${100 + width / 2 + 5} ${y + 4} ${100 + width / 2} ${y}Z`}
              />
              <path d={`M${100 - width / 2 + 10} ${y + 8}H${100 + width / 2 - 10}`} opacity="0.55" />
              <path d={`M${100 - 7} ${y + 15}V${y + 21}M${100 + 7} ${y + 15}V${y + 21}`} opacity="0.6" />
              <path d={`M${100 - width / 2} ${y + 7}L${100 - width / 2 - 17} ${y + 3}`} opacity="0.35" />
              <path d={`M${100 + width / 2} ${y + 7}L${100 + width / 2 + 17} ${y + 3}`} opacity="0.35" />
            </g>
          );
        })}
      </g>
      <g opacity="0.3" strokeWidth="0.7">
        <path d="M26 34H40M26 34V48M174 294H160M174 294V280" />
      </g>
    </Svg>
  );
}

export function NeuronField({ className = '' }) {
  return (
    <Svg viewBox="0 0 260 240" className={className}>
      <g strokeWidth="1.05" opacity="0.9">
        <circle cx="134" cy="118" r="23" />
        <circle cx="134" cy="118" r="9" opacity="0.55" />
        <path d="M112 108C94 92 91 68 98 50M113 101C95 84 76 80 58 84M117 99C105 76 91 60 69 52" />
        <path d="M111 123C90 122 72 135 60 152M115 128C98 138 88 156 86 176M120 136C110 152 108 173 115 190" />
        <path d="M155 108C174 94 186 76 188 55M156 115C180 108 199 93 211 72M157 124C180 127 199 139 209 158" />
        <path d="M153 131C173 142 184 159 185 181" />
        <path d="M157 118C188 116 210 121 228 132" />
        <path d="M58 84C50 76 44 72 32 70M69 52C62 44 53 41 44 40M60 152C50 154 42 160 36 169M86 176C78 181 72 190 70 200M188 55C192 46 199 41 210 38M211 72C220 70 227 65 234 57M185 181C192 188 195 199 194 212" />
        <path d="M134 95V141M111 118H157" opacity="0.25" />
      </g>
      <g fill="currentColor" stroke="none" opacity="0.55">
        <circle cx="32" cy="70" r="2" />
        <circle cx="44" cy="40" r="2" />
        <circle cx="36" cy="169" r="2" />
        <circle cx="70" cy="200" r="2" />
        <circle cx="210" cy="38" r="2" />
        <circle cx="234" cy="57" r="2" />
        <circle cx="194" cy="212" r="2" />
        <circle cx="188" cy="55" r="2" />
      </g>
      <g strokeWidth="0.7" opacity="0.35">
        <path d="M16 24H30M16 24V38M244 216H230M244 216V202" />
      </g>
    </Svg>
  );
}

export function PrecisionArcs({ className = '' }) {
  return (
    <Svg viewBox="0 0 260 260" className={className}>
      <g strokeWidth="0.9" opacity="0.9">
        <circle cx="130" cy="130" r="104" opacity="0.35" />
        <circle cx="130" cy="130" r="83" opacity="0.5" />
        <circle cx="130" cy="130" r="60" opacity="0.7" />
        <circle cx="130" cy="130" r="37" />
        <path d="M130 10V46M130 214V250M10 130H46M214 130H250" />
        <path d="M45 45L64 64M196 196L215 215M215 45L196 64M64 196L45 215" opacity="0.5" />
        <path d="M130 93V167M93 130H167" opacity="0.45" />
        <path d="M130 70A60 60 0 0 1 190 130" opacity="0.8" />
      </g>
      <g strokeWidth="0.7" opacity="0.35">
        <circle cx="130" cy="130" r="118" strokeDasharray="2 8" />
        <path d="M22 130H36M224 130H238M130 22V36M130 224V238" />
      </g>
      <circle cx="130" cy="130" r="3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ImpactArt({ className = '' }) {
  return (
    <Svg viewBox="0 0 260 220" className={className}>
      <g strokeWidth="1" opacity="0.9">
        <path d="M96 36C70 44 55 68 58 96C60 122 46 134 44 154C42 178 60 196 86 196C104 197 116 188 124 176" />
        <path d="M101 28C130 22 157 38 168 64C178 86 198 96 212 116C228 140 218 170 194 180" />
        <path d="M130 64C150 62 166 76 166 96C166 116 152 126 138 130" opacity="0.5" />
        <path d="M88 88C104 82 118 88 124 100M82 116C100 110 114 116 120 128M78 146C96 140 110 146 116 158" opacity="0.55" />
        <path d="M136 108L151 108L158 92L169 138L180 114L216 114" />
        <path d="M30 66L48 74M202 44L188 58M24 130L44 130M196 194L184 182" opacity="0.4" />
      </g>
      <g fill="currentColor" stroke="none" opacity="0.55">
        <circle cx="48" cy="74" r="2" />
        <circle cx="188" cy="58" r="2" />
        <circle cx="44" cy="130" r="2" />
        <circle cx="184" cy="182" r="2" />
      </g>
    </Svg>
  );
}

export function Artwork({ name, className }) {
  switch (name) {
    case 'brain':
      return <BrainProfile className={className} />;
    case 'spine':
      return <SpineColumn className={className} />;
    case 'neuron':
      return <NeuronField className={className} />;
    case 'trauma':
      return <ImpactArt className={className} />;
    case 'precision':
    default:
      return <PrecisionArcs className={className} />;
  }
}
