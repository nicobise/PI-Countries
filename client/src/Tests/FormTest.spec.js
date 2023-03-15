import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import Form from "./Form";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";

jest.mock("axios");

describe("Form component", () => {
  let store;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  it("should submit the form with correct data", async () => {
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        {Form()}
      </Provider>
    );
    fireEvent.change(getByLabelText("Name:"), {
      target: { value: "Rock Climbing" }
    });
    fireEvent.change(getByLabelText("Difficulty (1-5):"), {
      target: { value: 4 }
    });
    fireEvent.change(getByLabelText("Duration (in hs):"), {
      target: { value: 2 }
    });
    fireEvent.change(getByLabelText("Season:"), {
      target: { value: "Summer" }
    });
    fireEvent.click(getByTestId("submit-button"));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/activities",
      {
        name: "Rock Climbing",
        difficulty: 4,
        duration: 2,
        season: "Summer",
        country: []
      }
    );
  });
});

