import { FC } from "react";

export type LogoProps = {
  "aria-hidden"?: boolean;
  className?: string;
};

export const Logo: FC<LogoProps> = (props) => {
  const { className } = props;

  return (
    <svg
      width="377"
      height="377"
      viewBox="0 0 377 377"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={props["aria-hidden"]}
    >
      <title>tunci</title>
      <path
        d="M0 122C0 54.6214 54.6212 0 122 0H254.391C321.77 0 376.391 54.6212 376.391 122V254.391C376.391 321.77 321.77 376.391 254.391 376.391H122C54.6214 376.391 0 321.77 0 254.391V122Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.0598 12.0538C28.1953 31.7665 0 73.5907 0 122V254.391C0 302.8 28.1953 344.625 69.0598 364.337L69.0598 12.0538ZM115.06 0.19409V96.3844C135.004 80.4954 160.269 71 187.751 71C252.23 71 304.502 123.271 304.502 187.751C304.502 239.254 271.153 282.968 224.871 298.477L318.323 358.319C353.166 336.839 376.391 298.327 376.391 254.391V122C376.391 54.6212 321.77 0 254.391 0H122C119.671 0 117.357 0.0652731 115.06 0.19409ZM260.971 376.217L115.06 282.782V376.197C117.357 376.326 119.671 376.391 122 376.391H254.391C256.599 376.391 258.793 376.332 260.971 376.217ZM187.5 260C148.455 260 116.619 229.348 115.06 190.952V185.048C116.619 146.652 148.455 116 187.5 116C227.541 116 260 148.236 260 188C260 227.764 227.541 260 187.5 260Z"
        fill="url(#paint0_linear_7_40)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7_40"
          x1="188.196"
          y1="0"
          x2="188.196"
          y2="376.391"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
};
