"use client";

import dynamic from "next/dynamic";

const MotionTemplate = dynamic(
  () => import("../shared/components/templates/MotionTemplate"),
  {
    ssr: false,
  },
);

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MotionTemplate>{children}</MotionTemplate>;
}
