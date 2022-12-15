import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";
import ScorePage from "./pages/ScorePage";
import Game from "./components/Game";

let container = null;
const questionData = {
  correct_id: 793,
  options: [
    {
      appearance: "Kronk's New Groove",
      id: 4736,
      img: "https://static.wikia.nocookie.net/disney/images/a/a3/Ms._Birdwell_full_body_shot.png",
      name: "Ms. Birdwell",
    },
    {
      appearance: "Christopher Robin (film)",
      id: 2663,
      img: "https://static.wikia.nocookie.net/disney/images/2/29/Christopher-Robin.jpg",
      name: "Giles Winslow Jr.",
    },
    {
      appearance: "Recess: School's Out",
      id: 793,
      img: "https://static.wikia.nocookie.net/disney/images/5/5d/Char_30580.jpg",
      name: "Ashley B.",
    },
    {
      appearance: "The Cheetah Girls",
      id: 6161,
      img: "https://static.wikia.nocookie.net/disney/images/8/83/Channel_MainInfobox.jpg",
      name: "Chanel Simmons",
    },
  ],
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("displays 4 options for each question", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(questionData),
    })
  );
  render(<Game />, container);
  await waitFor(async () => {
    const options = await screen.findAllByRole("button");
    expect(options).toHaveLength(4);
  });

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("loads a score", async () => {
  render(<ScorePage score={7} setInPlay={() => {}} />, container);
  const score = screen.getByTestId("score");
  expect(score).toHaveTextContent(7);
});

it("displays the correct question number after playing the first round", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(questionData),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ question_no: 2 }),
      })
    );

  render(<Game />, container);
  const options = await screen.findAllByRole("button");
  fireEvent.click(options[0]);

  await waitFor(() => {
    const question = screen.getByTestId("questionNo");
    expect(question).toHaveTextContent(2);
  });

  global.fetch.mockRestore();
});
