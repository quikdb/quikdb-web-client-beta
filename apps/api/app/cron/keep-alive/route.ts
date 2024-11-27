import { NextResponse } from 'next/server';

export const POST = async () => {
  const pages = 1;

  return NextResponse.json({ pages });
};
