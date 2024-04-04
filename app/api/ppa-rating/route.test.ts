import { GET, POST } from "./route";
import { prismaMock } from "../../../prisma/prismaSingleton";
import { PpaRatingElement } from "../../lib/type";
import { NextResponse } from "next/server";
import { NEXT_BASE_URL } from "../../lib/macro";

const ppaRatingData = {
  id: 5,
  name: "a",
  importance: 5,
  easy: 5,
  transparency: 5,
  control: 5,
  responsibility: 5,
  time: 5,
  success_rate: 5,
  identity: 5,
  importance_other: 5,
  progress: 5,
  satisfaction: 5,
  preoccupancy: 5,
  support: 5,
  autonomy: 5,
  create_date: new Date("2024-04-02T06:51:48.271Z"),
  update_date: new Date("2024-04-02T06:51:48.271Z"),
};

const ppaRatingDataList = [
  ppaRatingData,
  {
    ...ppaRatingData,
    create_date: new Date("2025-04-02T06:51:48.271Z"),
    update_date: new Date("2025-04-02T06:51:48.271Z"),
  },
  {
    ...ppaRatingData,
    create_date: new Date("2020-04-02T06:51:48.271Z"),
    update_date: new Date("2020-04-02T06:51:48.271Z"),
  },
];

describe("/api/ppa-rating GET function", () => {
  test("should fetch ppaRatingData", async () => {
    prismaMock.ppaRating.findMany.mockResolvedValue(ppaRatingDataList);

    const ppaRatingSortedDataList = [
      {
        ...ppaRatingData,
        create_date: new Date("2020-04-02T06:51:48.271Z"),
        update_date: new Date("2020-04-02T06:51:48.271Z"),
      },
      ppaRatingData,
      {
        ...ppaRatingData,
        create_date: new Date("2025-04-02T06:51:48.271Z"),
        update_date: new Date("2025-04-02T06:51:48.271Z"),
      },
    ];

    const res = await GET();
    await expect(res.status).toEqual(200);
    await expect(res.json()).resolves.toEqual(
      JSON.parse(JSON.stringify({ ppaRating: ppaRatingSortedDataList }))
    );
  });

  test("should fail to fetch data with 'データの取得に失敗しました．'", async () => {
    prismaMock.ppaRating.findMany.mockImplementation(() => {
      throw new Error();
    });

    const res = await GET();
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("データの取得に失敗しました．");
  });

  test("should fail to fetch data with 'unknown error'", async () => {
    prismaMock.ppaRating.findMany.mockImplementation(() => {
      throw "unknown";
    });

    const res = await GET();
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("unknown error");
  });
});

describe("/api/ppa-rating POST function", () => {
  const projectName = "project";

  test("should fetch ppaRatingData", async () => {
    const dbData = { ...ppaRatingData, name: projectName };
    prismaMock.ppaRating.create.mockResolvedValue(dbData);

    const res = await POST(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        body: projectName,
        method: "POST",
      })
    );
    await expect(res.status).toEqual(200);
    await expect(res.json()).resolves.toEqual(
      JSON.parse(JSON.stringify(dbData))
    );
  });

  test("should fail to fetch data with 'データの作成に失敗しました．'", async () => {
    prismaMock.ppaRating.create.mockImplementation(() => {
      throw new Error();
    });

    const res = await POST(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        body: projectName,
        method: "POST",
      })
    );
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("データの作成に失敗しました．");
  });

  test("should fail to fetch data with 'unknown error'", async () => {
    prismaMock.ppaRating.create.mockImplementation(() => {
      throw "unknown";
    });

    const res = await POST(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        body: projectName,
        method: "POST",
      })
    );
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("unknown error");
  });
});
