import prisma from "~/prisma/prisma";
import { NextResponse } from "next/server";

type ppaRatingData = {
  name: string;
  importance: number;
  easy: number;
  transparency: number;
  control: number;
  responsibility: number;
  time: number;
  success_rate: number;
  identity: number;
  progress: number;
  satisfaction: number;
  preoccupancy: number;
  support: number;
  autonomy: number;
};

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse<{ body: string; init: { status: number } }>> {
  try {
    const ppaRatingData = await prisma.ppaRating.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (ppaRatingData) {
      return new NextResponse(JSON.stringify(ppaRatingData), {
        status: 200,
      });
    } else {
      return new NextResponse("データが存在しません．", {
        status: 404,
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      return new NextResponse("データの取得に失敗しました．", { status: 500 });
    } else {
      return new NextResponse("unknown error", { status: 500 });
    }
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ body: string; init: { status: number } }>> {
  try {
    const updateData: ppaRatingData = await req.json();
    const result = await prisma.ppaRating.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });
    console.log(result);
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      return new NextResponse("データの更新に失敗しました．", { status: 500 });
    } else {
      return new NextResponse("unknown error", { status: 500 });
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleteData = await prisma.ppaRating.delete({
      where: { id: parseInt(params.id) },
    });
    return new NextResponse(JSON.stringify(deleteData), {
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return new NextResponse("データの削除に失敗しました．", { status: 500 });
    } else {
      return new NextResponse("unknown error", { status: 500 });
    }
  }
}
