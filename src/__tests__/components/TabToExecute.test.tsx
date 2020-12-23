import React from "react";
import { render, screen } from "@testing-library/react";
import TabToExecute from "../../components/TabToExecute";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";

import { ILoideTab } from "../../lib/LoideInterfaces";

import { mockIonicReact } from "@ionic/react-test-utils";
import { SuffixNameTab } from "../../lib/constants";
mockIonicReact();

var tabs: Map<number, ILoideTab> = new Map<number, ILoideTab>();
tabs.set(1, {
    title: `${SuffixNameTab}1`,
    type: "",
    value: "node(1)",
});

tabs.set(2, {
    title: `${SuffixNameTab}2`,
    type: "",
    value: "color(2)",
});

test("renders without crashing", () => {
    const { baseElement } = render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );
    expect(baseElement).toBeDefined();
});

test("renders the header", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );

    await screen.findByText("Choose tab to execute");
});

test("renders the curent tab item", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );

    await screen.findByText("Current tab");
});

test("renders the tab items", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );

    await screen.findByText(tabs.get(1)!.title);
    await screen.findByText(tabs.get(2)!.title);
});

test("test click the current tab radio item", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );

    const radio = await screen.findByTitle("Current tab");

    fireEvent.click(radio!, "");
});

test("test click the all tabs radio item", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );

    const radio = await screen.findByTitle("All tabs");

    fireEvent.click(radio!, "");
});

test("test click the tab items", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={jest.fn()}
            onCheckTab={jest.fn()}
            onCheckAllTabs={jest.fn()}
        />
    );

    const item = await (await screen.findByText(tabs.get(1)!.title))
        .nextElementSibling;

    fireEvent.click(item!, "");

    expect(item).toHaveProperty("checked", true);
});
