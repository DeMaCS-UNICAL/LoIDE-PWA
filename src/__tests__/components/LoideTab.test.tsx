import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoideTab from "../../components/LoideTab";
import { SuffixNameTab } from "../../lib/constants";

test("tab renders without crashing", () => {
    const key: number = 1;
    const title = `${SuffixNameTab}1`;
    const deleteMock = jest.fn();
    const { baseElement } = render(
        <LoideTab tabkey={key} onDeleteTab={deleteMock}>
            <span> {title}</span>
        </LoideTab>
    );
    expect(baseElement).toBeDefined();
});

test("renders tab title", async () => {
    const key: number = 1;
    const title = `${SuffixNameTab}1`;
    const deleteMock = jest.fn();
    render(
        <LoideTab tabkey={key} onDeleteTab={deleteMock}>
            <span> {title}</span>
        </LoideTab>
    );
    await screen.findByText(title);
});

test("clicks delete tab button", async () => {
    const key: number = 1;
    const title = `${SuffixNameTab}1`;
    const deleteMock = jest.fn();

    render(
        <LoideTab tabkey={key} onDeleteTab={deleteMock}>
            <span> {title}</span>
        </LoideTab>
    );

    const button = await screen.findByTitle("Delete tab");
    fireEvent.click(button);
    expect(deleteMock).toHaveBeenCalledTimes(1);
});
