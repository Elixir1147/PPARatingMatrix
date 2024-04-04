"use client";
import PpaRatingCard from "./_components/PpaRatingCard";
import { PpaRatingElement } from "./lib/type";
import { KEY_SEPARATER, NEXT_BASE_URL } from "./lib/macro";
import AddProjectButton from "./_components/AddProjectButton";
import { useEffect, useState, useRef, ChangeEvent, MouseEvent } from "react";

export default function Home() {
  const [elementList, setElementList] = useState<PpaRatingElement[] | null>(
    null
  );
  const inputDoms = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res: { ppaRating: PpaRatingElement[] } | string = await fetch(
        NEXT_BASE_URL + "/api/ppa-rating/",
        {
          method: "GET",
          cache: "no-cache",
        }
      )
        .then((res) => {
          switch (res.status) {
            case 200: {
              return res.json();
            }
            case 500: {
              return res.text();
            }
            default: {
              throw new Error();
            }
          }
        })
        .catch((err) => "エラーが発生しました．");
      if (!ignore) {
        if (typeof res === "string") {
          alert(res);
        } else {
          setElementList(res.ppaRating);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleClick() {
    if (inputDoms.current) {
      const projectName = inputDoms.current.value;
      const addedElement: PpaRatingElement | string = await fetch(
        NEXT_BASE_URL + "/api/ppa-rating",
        {
          method: "POST",
          body: projectName,
        }
      )
        .then((res) => {
          switch (res.status) {
            case 200: {
              return res.json();
            }
            case 500: {
              return "プロジェクトの追加に失敗しました．";
            }
            default: {
              throw new Error();
            }
          }
        })
        .catch((err) => {
          return "プロジェクトの追加に失敗しました．";
        });
      if (typeof addedElement !== "string") {
        if (elementList !== null) {
          setElementList([...elementList, addedElement]);
        }
      } else {
        alert(addedElement);
      }
    }
  }
  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (elementList) {
      const [id, changedValueName] = e.target.id.split(KEY_SEPARATER);
      const newValue = parseInt(e.target.value);
      const [element] = elementList.filter((el) => el.id.toString() === id);
      const res: string | PpaRatingElement = await fetch(
        NEXT_BASE_URL + "/api/ppa-rating/" + id,
        {
          method: "PUT",
          body: JSON.stringify({
            ...element,
            [changedValueName]: newValue,
          }),
        }
      )
        .then((res) => {
          switch (res.status) {
            case 200: {
              return res.json();
            }
            case 500: {
              return "プロジェクトの更新に失敗しました．";
            }
            default: {
              throw new Error();
            }
          }
        })
        .catch((err: Error) => {
          return `更新時にエラーが発生しました．${err.message}`;
        });
      if (typeof res === "string") {
        alert(res);
      } else {
        const newElementList = elementList.filter((el) => el.id !== res.id);
        console.debug(res);
        setElementList([res, ...newElementList]);
      }
    }
  }

  async function deleteRow(e: MouseEvent<HTMLButtonElement>) {
    if (elementList) {
      const [id] = (e.target as HTMLButtonElement).id.split(KEY_SEPARATER);
      const res: PpaRatingElement | string = await fetch(
        NEXT_BASE_URL + "/api/ppa-rating/" + id,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          switch (res.status) {
            case 200: {
              return res.json();
            }
            case 500: {
              return "プロジェクトの削除に失敗しました．";
            }
            default: {
              throw new Error();
            }
          }
        })
        .catch((err: Error) => {
          return `削除時にエラーが発生しました．${err.message}`;
        });
      if (typeof res === "string") {
        alert(res);
      } else {
        const newElementList = elementList?.filter((el) => el.id !== res.id);
        setElementList(newElementList);
      }
    }
  }

  return (
    <main>
      <AddProjectButton ref={inputDoms} handleClick={handleClick} />
      {elementList === null ? (
        "Loading"
      ) : (
        <table
          style={{
            tableLayout: "auto",
            borderSpacing: "1rem 1rem",
          }}
        >
          <caption>PPA Rating Matrix</caption>
          <thead>
            <th scope="col">プロジェクト名</th>
            <th scope="col">重要性</th>
            <th scope="col">簡単さ</th>
            <th scope="col">透明性</th>
            <th scope="col">管理性</th>
            <th scope="col">責任</th>
            <th scope="col">時間適正</th>
            <th scope="col">成功率</th>
            <th scope="col">自己同一性</th>
            <th scope="col">他者からの重要性</th>
            <th scope="col">進捗状況</th>
            <th scope="col">やりがい度</th>
            <th scope="col">没頭度</th>
            <th scope="col">支持レベル</th>
            <th scope="col">自立性</th>
            <th scope="col">合計値</th>
          </thead>
          <tbody>
            {elementList.map((e) => {
              return (
                <PpaRatingCard
                  key={e.id}
                  elements={{ ...e }}
                  handleChange={handleChange}
                  deleteRow={deleteRow}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
