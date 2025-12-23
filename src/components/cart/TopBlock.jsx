import RewardMeter from "./RewardMeter";

export default function TopBlock({
  OpenCart,
  subtotal
}) {
  const rewards = [
    { label: 'free shipping', threshold: 35 },
    { label: '10% off', threshold: 50 },
    { label: '20% off', threshold: 75 }
  ];

  const nextReward = rewards.find(r => subtotal < r.threshold);

  let message;

  if (!nextReward) {
    message = <span>Fully loaded. Every reward applied.</span>;
  } else {
    const remaining = nextReward.threshold - subtotal;

    message = (
      <>
        You are <span>£{remaining.toFixed(2)}</span> away from{" "}
        <span>{nextReward.label}</span>
      </>
    );
  }

  return (
    <div className="cart-top-block top">
      <div className="f-row j-s-b">
        <p className="promotional-reward">
          {message}
        </p>

        <button
          className="close-cart f-row j-c"
          onClick={OpenCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 9">
            <path d="M8.23139.268496c-.358-.357994-.93791-.3579944-1.2959 0L4.24994 2.95404 1.56439.268496c-.35799-.3579946-.9379-.3579946-1.295894 0-.3579946.357994-.3579946.937904 0 1.295894L2.95404 4.24994.268496 6.93549c-.3579944.35799-.357994.9379 0 1.2959.357999.35794.937924.35797 1.295894 0l2.68555-2.68555 2.68555 2.68555c.358.35794.93792.35797 1.2959 0 .35797-.35798.35794-.9379 0-1.2959L5.54584 4.24994l2.68555-2.68555c.35797-.35797.35794-.937895 0-1.295894Z"/>
          </svg>
        </button>
      </div>

      <RewardMeter orderValue={subtotal} />
    </div>
  );
}
