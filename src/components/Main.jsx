// src/components/Main.jsx
import React, { useReducer, useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "../times";

export default function Main({ onSubmit }) {
  const [values, setValues] = useState({
    date: "", // "YYYY-MM-DD"
    time: "",
    numPersons: "",
    occasion: "",
  });
  const change = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  // <-- creates `times` and `dispatch`
  const [times, dispatch] = useReducer(updateTimes, [], initializeTimes);

  // keep times in sync when the date string changes
  useEffect(() => {
    if (values.date) {
      const [y, m, d] = values.date.split("-").map(Number);
      dispatch({ type: "date_changed", date: new Date(y, m - 1, d) });
    }
  }, [values.date]);

  const submit = (formValues) => onSubmit(formValues);

  return (
    <main>
      <BookingForm
        values={values}
        change={change}
        submit={submit}
        times={times}
        dispatch={dispatch}
      />
    </main>
  );
}
