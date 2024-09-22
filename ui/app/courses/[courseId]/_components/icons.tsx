export const ChoicesIcon = ({ color = "#9333ea" }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M28 13V4h-9v2h5.586L16 14.586L7.414 6H13V4H4v9h2V7.414l9 9V26H4v2h24v-2H17v-9.586l9-9V13z"
      />
    </svg>
  );
};