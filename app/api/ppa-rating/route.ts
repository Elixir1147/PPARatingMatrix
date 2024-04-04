import prisma from "~/prisma/prisma";

import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<{ body: string; init: { status: number } }>
> {
  try {
    const ppaRatingData = await prisma.ppaRating.findMany();
    const sortedPpaRatingData = ppaRatingData.sort((a, b) => {
      return a.create_date.valueOf() - b.update_date.valueOf();
    });
    return new NextResponse(
      JSON.stringify({ ppaRating: sortedPpaRatingData }),
      {
        status: 200,
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      return new NextResponse("データの取得に失敗しました．", { status: 500 });
    } else {
      return new NextResponse("unknown error", { status: 500 });
    }
  }
}

export async function POST(
  req: Request
): Promise<NextResponse<{ body: string; init: { status: number } }>> {
  try {
    const projectName = await req.text();
    const result = await prisma.ppaRating.create({
      data: { name: projectName },
    });
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      return new NextResponse("データの作成に失敗しました．", { status: 500 });
    } else {
      return new NextResponse("unknown error", { status: 500 });
    }
  }
}
