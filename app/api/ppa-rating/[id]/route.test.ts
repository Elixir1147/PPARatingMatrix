import { GET, PUT, DELETE } from "./route";
import { prismaMock } from "../../../../prisma/prismaSingleton";
import { PpaRatingElement } from "../../../lib/type";
import { NextResponse } from "next/server";
import { NEXT_BASE_URL } from "../../../lib/macro";

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

describe("/api/ppa-rating/[id] GET function", () => {
  const req = new Request(NEXT_BASE_URL + "/api/ppa-rating", {
    method: "GET",
  });
  test("should fetch ppaRatingData", async () => {
    prismaMock.ppaRating.findUnique.mockResolvedValue(ppaRatingData);

    const res = await GET(req, { params: { id: "5" } });
    await expect(res.status).toEqual(200);
    await expect(res.json()).resolves.toEqual(
      JSON.parse(JSON.stringify(ppaRatingData))
    );
  });

  test("should fail to fetch data with 'データが存在しません．'", async () => {
    prismaMock.ppaRating.findUnique.mockResolvedValue(null);

    const res = await GET(req, { params: { id: "33" } });
    await expect(res.status).toEqual(404);
    await expect(res.text()).resolves.toEqual("データが存在しません．");
  });

  test("should fail to fetch data with 'データの取得に失敗しました．'", async () => {
    prismaMock.ppaRating.findUnique.mockImplementation(() => {
      throw new Error();
    });

    const res = await GET(req, { params: { id: "aaaa" } });
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("データの取得に失敗しました．");
  });

  test("should fail to fetch data with 'unknown error'", async () => {
    prismaMock.ppaRating.findUnique.mockImplementation(() => {
      throw "unknown";
    });

    const res = await GET(req, { params: { id: "33" } });
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("unknown error");
  });
});

describe("/api/ppa-rating/[id] PUT function", () => {
  test("should fetch ppaRatingData", async () => {
    prismaMock.ppaRating.update.mockResolvedValue(ppaRatingData);

    const res = await PUT(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        method: "PUT",
        body: JSON.stringify(ppaRatingData),
      }),
      { params: { id: "5" } }
    );

    await expect(res.status).toEqual(200);
    await expect(res.json()).resolves.toEqual(
      JSON.parse(JSON.stringify(ppaRatingData))
    );
  });

  test("should fail to fetch data with 'データの更新に失敗しました．'", async () => {
    prismaMock.ppaRating.update.mockImplementation(() => {
      throw new Error();
    });

    const res = await PUT(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        method: "PUT",
        body: JSON.stringify(ppaRatingData),
      }),
      { params: { id: "5" } }
    );

    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("データの更新に失敗しました．");
  });

  test("should fail to fetch data with 'unknown error'", async () => {
    prismaMock.ppaRating.update.mockImplementation(() => {
      throw "unknown";
    });

    const res = await PUT(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        method: "PUT",
        body: JSON.stringify(ppaRatingData),
      }),
      { params: { id: "33" } }
    );
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("unknown error");
  });
});

describe("/api/ppa-rating/[id] DELETE function", () => {
  test("should fetch ppaRatingData", async () => {
    prismaMock.ppaRating.delete.mockResolvedValue(ppaRatingData);

    const res = await DELETE(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        method: "DELETE",
        body: JSON.stringify(ppaRatingData),
      }),
      { params: { id: "5" } }
    );

    await expect(res.status).toEqual(200);
    await expect(res.json()).resolves.toEqual(
      JSON.parse(JSON.stringify(ppaRatingData))
    );
  });

  test("should fail to fetch data with 'データの削除に失敗しました．'", async () => {
    prismaMock.ppaRating.delete.mockImplementation(() => {
      throw new Error();
    });

    const res = await DELETE(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        method: "DELETE",
        body: JSON.stringify(ppaRatingData),
      }),
      { params: { id: "5" } }
    );

    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("データの削除に失敗しました．");
  });

  test("should fail to fetch data with 'unknown error'", async () => {
    prismaMock.ppaRating.delete.mockImplementation(() => {
      throw "unknown";
    });

    const res = await DELETE(
      new Request(NEXT_BASE_URL + "/api/ppa-rating", {
        method: "DELETE",
        body: JSON.stringify(ppaRatingData),
      }),
      { params: { id: "33" } }
    );
    await expect(res.status).toEqual(500);
    await expect(res.text()).resolves.toEqual("unknown error");
  });
});
