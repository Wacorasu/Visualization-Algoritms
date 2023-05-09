import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button.tsx";

describe("Отрисовка кнопки", () => {
  it("Кнопка рендерится с текстом без ошибок", () => {
    const tree = renderer
      .create(<Button text="Развернуть" type="button" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка рендерится без текстом без ошибок", () => {
    const tree = renderer.create(<Button text="" type="button" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка рендерится заблокированной без ошибок", () => {
    const tree = renderer
      .create(<Button text="Развернуть" type="button" disabled />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка с рендерится загрузки рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button text="Развернуть" type="button" isLoader={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Нажатие на кнопку вызывает корректный колбэк", () => {
    const buttonFunction = jest.fn();
    render(
      <Button
        text="Развернуть"
        type="button"
        onClick={() => buttonFunction()}
      />
    );
    const button = screen.getByText("Развернуть");
    
    fireEvent.click(button);
    expect(buttonFunction).toHaveBeenCalledWith();
  });
});
