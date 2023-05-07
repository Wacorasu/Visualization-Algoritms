import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import { Circle } from "./circle.tsx";
import { ElementStates } from "../../../types/element-states.ts";

describe("Отрисовка компонента круг", () => {
  it("Круг рендерится без буквы без ошибок", () => {
    const tree = renderer
      .create(<Circle letter="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится c буквами без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится c head без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" head='Тест'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится  c параметром isSmall без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" isSmall/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится  c index без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" index={0}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится c react head без ошибок", () => {
    const circle = <Circle letter="Тест" isSmall/>
    const tree = renderer.create(<Circle letter="Тест" head={circle}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится c tail без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" tail='Тест'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится c react tail без ошибок", () => {
    const circle = <Circle letter="Тест"  isSmall/>
    const tree = renderer.create(<Circle letter="Тест" tail={circle}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it("Круг рендерится в состоянии modified без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" state={ElementStates.Modified}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится в состоянии default без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" state={ElementStates.Default}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг рендерится в состоянии changing без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" state={ElementStates.Changing}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
