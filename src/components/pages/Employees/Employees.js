import React, { useCallback, useState } from "react";
import Button from "../../general/Button";
import style from "./Employees.module.scss";

export const storageKey = "employees";
export const employees = new Set(
  JSON.parse(localStorage.getItem(storageKey) || "[]")
);

const setToJson = (set) => JSON.stringify(Array.from(set.values()));

export default () => {
  const [, setUpdate] = useState(0);

  const removeEmployee = useCallback((employee) => {
    employees.delete(employee);
    localStorage.setItem(storageKey, setToJson(employees));

    setUpdate(Math.random());
  }, []);

  const addEmployee = useCallback(() => {
    employees.add(prompt("Voer naam in:"));
    localStorage.setItem(storageKey, setToJson(employees));

    setUpdate(Math.random());
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.buttonWrapper}>
        <h2 className={style.title}>Personeel</h2>

        <Button onClick={addEmployee} className={style.addButton}>
          Toevoegen
        </Button>
      </div>

      <ul className={style.list}>
        {Array.from(employees).map((employee) => (
          <li className={style.listItem}>
            <span className={style.entryName}>{employee}</span>

            <Button
              onClick={() => removeEmployee(employee)}
              className={style.entryButton}
            >
              Verwijder
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
