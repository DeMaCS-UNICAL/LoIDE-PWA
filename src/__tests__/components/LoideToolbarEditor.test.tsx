import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoideToolbarEditor from "../../components/LoideToolbarEditor";

Object.defineProperty(navigator, "clipboard", {
    value: {
        readText: jest.fn(),
    },
});

test("renders without crashing", () => {
    const { baseElement } = render(
        <LoideToolbarEditor
            onUndo={jest.fn()}
            onRedo={jest.fn()}
            onSearch={jest.fn()}
            onCopy={jest.fn()}
            onCut={jest.fn()}
            onDownloadTab={jest.fn()}
        />
    );
    expect(baseElement).toBeDefined();
});

test("test undo button", async () => {
    const onUndo = jest.fn();

    render(
        <LoideToolbarEditor
            onUndo={onUndo}
            onRedo={jest.fn()}
            onSearch={jest.fn()}
            onCopy={jest.fn()}
            onCut={jest.fn()}
            onDownloadTab={jest.fn()}
        />
    );

    const button = await screen.findByTitle("Undo");
    fireEvent.click(button);

    expect(onUndo).toBeCalledTimes(1);
});

test("test redo button", async () => {
    const onRedo = jest.fn();

    render(
        <LoideToolbarEditor
            onRedo={onRedo}
            onUndo={jest.fn()}
            onSearch={jest.fn()}
            onCopy={jest.fn()}
            onCut={jest.fn()}
            onDownloadTab={jest.fn()}
        />
    );

    const button = await screen.findByTitle("Redo");
    fireEvent.click(button);

    expect(onRedo).toBeCalledTimes(1);
});

test("test search button", async () => {
    const onSearch = jest.fn();

    render(
        <LoideToolbarEditor
            onSearch={onSearch}
            onUndo={jest.fn()}
            onRedo={jest.fn()}
            onCopy={jest.fn()}
            onCut={jest.fn()}
            onDownloadTab={jest.fn()}
        />
    );

    const button = await screen.findByTitle("Search");
    fireEvent.click(button);

    expect(onSearch).toBeCalledTimes(1);
});

test("test paste button", async () => {
    const onPaste = jest.fn();

    render(
        <LoideToolbarEditor
            onUndo={jest.fn()}
            onRedo={jest.fn()}
            onSearch={jest.fn()}
            onPaste={onPaste}
            onCopy={jest.fn()}
            onCut={jest.fn()}
            onDownloadTab={jest.fn()}
        />
    );

    const button = await screen.findByTitle("Paste");
    fireEvent.click(button);

    expect(onPaste).toBeCalledTimes(1);
});

// test("test copy button", async () => {
//     const onCopy = jest.fn();

//     render(
//         <LoideToolbarEditor
//             onUndo={jest.fn()}
//             onRedo={jest.fn()}
//             onSearch={jest.fn()}
//             onPaste={jest.fn()}
//             onCopy={onCopy}
//             onCut={jest.fn()}
//             onDownloadTab={jest.fn()}
//         />
//     );

//     const button = await screen.findByTitle("Copy");
//     fireEvent.click(button);

//     expect(onCopy).toBeCalledTimes(1);
// });

// test("test cut button", async () => {
//     const onCut = jest.fn();

//     render(
//         <LoideToolbarEditor
//             onUndo={jest.fn()}
//             onRedo={jest.fn()}
//             onSearch={jest.fn()}
//             onPaste={jest.fn()}
//             onCopy={jest.fn()}
//             onCut={onCut}
//             onDownloadTab={jest.fn()}
//         />
//     );

//     const button = await screen.findByTitle("Cut");
//     fireEvent.click(button);

//     expect(onCut).toBeCalledTimes(1);
// });

test("test download content tab button", async () => {
    const onDownloadTab = jest.fn();

    render(
        <LoideToolbarEditor
            onUndo={jest.fn()}
            onRedo={jest.fn()}
            onSearch={jest.fn()}
            onPaste={jest.fn()}
            onCopy={jest.fn()}
            onCut={jest.fn()}
            onDownloadTab={onDownloadTab}
        />
    );

    const button = await screen.findByTitle("Download content");
    fireEvent.click(button);

    expect(onDownloadTab).toBeCalledTimes(1);
});
