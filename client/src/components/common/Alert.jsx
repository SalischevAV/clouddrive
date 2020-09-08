import React from "react";
import { useSelector } from "react-redux";
import "./input.css";

export default () => {
  const alert = useSelector(state => state.app.alert);
  return (
            <div className="sticky">
                {alert && <div>{alert}</div>}
            </div>
        )
};
