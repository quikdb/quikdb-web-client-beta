'use client';
import Link from "next/link";
import { FC } from "react";

export const Logo: FC = () => {
  return (
    <>
      <Link href={'/'}>
        <img width={'100rem'} height={'100rem'} src='/images/quikdb-logo.png' />
      </Link>
    </>
  );
};
