export const Spinner = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
    // eslint-disable-next-line tailwindcss/no-custom-classname
    className="lds-ring"
  >
    <circle
      cx="15"
      cy="15"
      fill="none"
      r="13"
      stroke="#b7b7b7"
      strokeWidth="2"
      strokeLinecap="round"
      transform="rotate(216.567 15 15)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 15 15;320 15 15;720 15 15"
        keyTimes="0;0.5;1"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dasharray"
        calcMode="linear"
        values="0 80; 70 80; 00 80"
        keyTimes="0;0.5;1"
        dur="1"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
