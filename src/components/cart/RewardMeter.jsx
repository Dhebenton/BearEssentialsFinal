const HEIGHT = 23;
const SLANT = 12;
const RADIUS = 999;
const OVERLAP = 5;
const TRANSITION_MS = 300;

function clamp(n) {
  return Math.max(0, Math.min(1, n));
}

function Segment({ fillPct, type, isLast, isActive }) {
  let segmentClip = "none";
  let borderRadius = "0";

  if (type === "left") {
    segmentClip = `polygon(0 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`;
    borderRadius = `${RADIUS}px 0 0 ${RADIUS}px`;
  }

  if (type === "middle") {
    segmentClip = `polygon(${SLANT}px 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`;
  }

  if (type === "right") {
    segmentClip = `polygon(${SLANT}px 0, 100% 0, 100% 100%, 0 100%)`;
    borderRadius = `0 ${RADIUS}px ${RADIUS}px 0`;
  }

  const pct = clamp(fillPct);

  const fillClip =
    isActive || pct < 1
      ? `polygon(0 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`
      : `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;

  const translateX = `calc(${(pct - 1) * 100}%)`;

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        height: "100%",
        background: "#718776",
        clipPath: segmentClip,
        borderRadius,
        overflow: "hidden",
        marginRight: isLast ? 0 : -OVERLAP,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `calc(100% + ${SLANT}px)`,
          background: "#264A31",
          clipPath: fillClip,
          transform: `translateX(${translateX})`,
          transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
    </div>
  );
}

export default function RewardMeter({
  orderValue = 40.5,
  tiers = [
    { label: "Free Shipping", threshold: 35 },
    { label: "10% Off", threshold: 50 },
    { label: "20% Off", threshold: 75 },
  ],
}) {
  let tierClass = "";

  if (orderValue >= tiers[0]?.threshold) tierClass = "tierone";
  if (orderValue >= tiers[1]?.threshold) tierClass = "tiertwo";
  if (orderValue >= tiers[2]?.threshold) tierClass = "tierthree";

  let remaining = orderValue;

  const fills = tiers.map((tier, i) => {
    const prev = tiers[i - 1]?.threshold ?? 0;
    const range = tier.threshold - prev;

    const consumed = Math.min(Math.max(remaining, 0), range);
    remaining -= range;

    return consumed / range;
  });

  const activeIndex = fills.findIndex(p => p > 0 && p < 1);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="reward-meter-block" style={{ display: "flex", height: HEIGHT }}>
        {tiers.map((tier, i) => (
          <Segment
            key={tier.label}
            fillPct={fills[i]}
            isActive={i === activeIndex}
            type={
              i === 0
                ? "left"
                : i === tiers.length - 1
                ? "right"
                : "middle"
            }
            isLast={i === tiers.length - 1}
          />
        ))}
      </div>

      <div
        className={`reward-meter ${tierClass}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tiers.length}, 1fr)`,
          textAlign: "center",
        }}
      >
        {tiers.map(t => (
          <div
            key={t.threshold}
            className="reward-meter-label-ammount tra gant"
          >
            £{t.threshold}
          </div>
        ))}

        {tiers.map(t => (
          <div key={t.label} className="reward-meter-label tra">
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}
