import { render, screen } from "@testing-library/react";
import TabToExecute from "../../components/TabToExecute";
import { fireEvent } from "@testing-library/react";

import { EditorTabMap } from "../../lib/LoideInterfaces";

import { AllTabs, CurrentTab, SuffixNameTab } from "../../lib/constants";
fireEvent();

const tabs: EditorTabMap = {};
tabs[1] = {
  title: `${SuffixNameTab}1`,
  type: "",
  value: "node(1)",
};

tabs[2] = {
  title: `${SuffixNameTab}2`,
  type: "",
  value: "color(2)",
};

describe("<TabToExecute />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={[]}
        onCheckCurrentTab={jest.fn()}
        onCheckTab={jest.fn()}
        onCheckAllTabs={jest.fn()}
      />,
    );
    expect(baseElement).toBeDefined();
  });

  it("renders the header", async () => {
    render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={[]}
        onCheckCurrentTab={jest.fn()}
        onCheckTab={jest.fn()}
        onCheckAllTabs={jest.fn()}
      />,
    );

    await screen.findByText("Choose tab to execute");
  });

  it("renders the curent tab item", async () => {
    render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={[]}
        onCheckCurrentTab={jest.fn()}
        onCheckTab={jest.fn()}
        onCheckAllTabs={jest.fn()}
      />,
    );

    await screen.findByText("Current tab");
  });

  it("renders the tab items", async () => {
    render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={[]}
        onCheckCurrentTab={jest.fn()}
        onCheckTab={jest.fn()}
        onCheckAllTabs={jest.fn()}
      />,
    );

    await screen.findByText(tabs[1].title);
    await screen.findByText(tabs[2].title);
  });

  it("test click the current tab radio item", async () => {
    let tabsIDToExecute: number[] = [1, 2];
    const onCheckCurrentTab = jest.fn((value: boolean) => {
      if (value) {
        tabsIDToExecute = [];
      }
    });
    render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={tabsIDToExecute}
        onCheckCurrentTab={onCheckCurrentTab}
        onCheckTab={jest.fn()}
        onCheckAllTabs={jest.fn()}
      />,
    );

    const radioGroup = await screen.findByTestId("group-radio-tab");

    fireEvent(radioGroup, new CustomEvent("ionChange", { detail: { value: CurrentTab } }));

    expect(onCheckCurrentTab).toBeCalled();
    expect(tabsIDToExecute.length).toBe(0);
  });

  it("test click the all tabs radio item", async () => {
    let tabsIDToExecute: number[] = [];
    const onCheckAllTabs = jest.fn((value: boolean) => {
      if (value) {
        tabsIDToExecute = [...Object.keys(tabs).map((item) => Number(item))];
      }
    });
    render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={tabsIDToExecute}
        onCheckCurrentTab={jest.fn()}
        onCheckTab={jest.fn()}
        onCheckAllTabs={onCheckAllTabs}
      />,
    );

    const radioGroup = await screen.findByTestId("group-radio-tab");

    fireEvent(radioGroup, new CustomEvent("ionChange", { detail: { value: AllTabs } }));

    expect(onCheckAllTabs).toBeCalled();
    expect(tabsIDToExecute.length).toBe(Object.keys(tabs).length);
  });

  it("test click the tab items", async () => {
    const tabsIDToExecute: number[] = [];
    const onCheckTab = jest.fn((id: number, value: boolean) => {
      if (value) tabsIDToExecute.push(id);
    });
    render(
      <TabToExecute
        tabs={tabs}
        tabsIDToExecute={tabsIDToExecute}
        onCheckCurrentTab={jest.fn()}
        onCheckTab={onCheckTab}
        onCheckAllTabs={jest.fn()}
      />,
    );

    const item = await screen.findByTestId(`item-tab-1`);

    fireEvent.click(item);

    expect(onCheckTab).toBeCalled();
    expect(tabsIDToExecute.length).toBe(1);
  });
});
