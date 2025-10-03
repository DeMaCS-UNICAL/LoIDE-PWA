import { fireEvent, render, screen } from "@testing-library/react";
import LoideToolbarEditor from "../../components/LoideToolbarEditor";

Object.defineProperty(navigator, "clipboard", {
  value: {
    readText: jest.fn(),
  },
});

describe("<LoideToolbarEditor />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <LoideToolbarEditor
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />,
    );
    expect(baseElement).toBeDefined();
  });

  it("test undo button", async () => {
    const onUndo = jest.fn();

    render(
      <LoideToolbarEditor
        onUndo={onUndo}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />,
    );

    const button = await screen.findByTitle("Undo");
    fireEvent.click(button);

    expect(onUndo).toHaveBeenCalledTimes(1);
  });

  it("test redo button", async () => {
    const onRedo = jest.fn();

    render(
      <LoideToolbarEditor
        onRedo={onRedo}
        onUndo={jest.fn()}
        onSearch={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />,
    );

    const button = await screen.findByTitle("Redo");
    fireEvent.click(button);

    expect(onRedo).toHaveBeenCalledTimes(1);
  });

  it("test search button", async () => {
    const onSearch = jest.fn();

    render(
      <LoideToolbarEditor
        onSearch={onSearch}
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />,
    );

    const button = await screen.findByTitle("Search");
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("test paste button", async () => {
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
      />,
    );

    const button = await screen.findByTitle("Paste");
    fireEvent.click(button);

    expect(onPaste).toHaveBeenCalledTimes(1);
  });

  it.skip("test copy button", async () => {
    const onCopy = jest.fn();

    render(
      <LoideToolbarEditor
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onPaste={jest.fn()}
        onCopy={onCopy}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />,
    );

    const button = await screen.findByTitle("Copy");
    fireEvent.click(button);

    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it.skip("test cut button", async () => {
    const onCut = jest.fn();

    render(
      <LoideToolbarEditor
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onPaste={jest.fn()}
        onCopy={jest.fn()}
        onCut={onCut}
        onDownloadTab={jest.fn()}
      />,
    );

    const button = await screen.findByTitle("Cut");
    fireEvent.click(button);

    expect(onCut).toHaveBeenCalledTimes(1);
  });

  it("test download content tab button", async () => {
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
      />,
    );

    const button = await screen.findByTitle("Download content");
    fireEvent.click(button);

    expect(onDownloadTab).toHaveBeenCalledTimes(1);
  });
});
