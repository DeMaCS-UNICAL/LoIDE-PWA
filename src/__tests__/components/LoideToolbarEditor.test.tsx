import { fireEvent, render, screen } from "@testing-library/react";
import LoideToolbarEditor from "../../components/LoideToolbarEditor";
import { vi } from "vitest";

Object.defineProperty(navigator, "clipboard", {
  value: {
    readText: vi.fn(),
  },
});

describe("<LoideToolbarEditor />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <LoideToolbarEditor
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onSearch={vi.fn()}
        onCopy={vi.fn()}
        onCut={vi.fn()}
        onDownloadTab={vi.fn()}
      />,
    );
    expect(baseElement).toBeDefined();
  });

  it("test undo button", async () => {
    const onUndo = vi.fn();

    render(
      <LoideToolbarEditor
        onUndo={onUndo}
        onRedo={vi.fn()}
        onSearch={vi.fn()}
        onCopy={vi.fn()}
        onCut={vi.fn()}
        onDownloadTab={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Undo");
    fireEvent.click(button);

    expect(onUndo).toHaveBeenCalledTimes(1);
  });

  it("test redo button", async () => {
    const onRedo = vi.fn();

    render(
      <LoideToolbarEditor
        onRedo={onRedo}
        onUndo={vi.fn()}
        onSearch={vi.fn()}
        onCopy={vi.fn()}
        onCut={vi.fn()}
        onDownloadTab={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Redo");
    fireEvent.click(button);

    expect(onRedo).toHaveBeenCalledTimes(1);
  });

  it("test search button", async () => {
    const onSearch = vi.fn();

    render(
      <LoideToolbarEditor
        onSearch={onSearch}
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onCopy={vi.fn()}
        onCut={vi.fn()}
        onDownloadTab={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Search");
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("test paste button", async () => {
    const onPaste = vi.fn();

    render(
      <LoideToolbarEditor
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onSearch={vi.fn()}
        onPaste={onPaste}
        onCopy={vi.fn()}
        onCut={vi.fn()}
        onDownloadTab={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Paste");
    fireEvent.click(button);

    expect(onPaste).toHaveBeenCalledTimes(1);
  });

  it.skip("test copy button", async () => {
    const onCopy = vi.fn();

    render(
      <LoideToolbarEditor
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onSearch={vi.fn()}
        onPaste={vi.fn()}
        onCopy={onCopy}
        onCut={vi.fn()}
        onDownloadTab={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Copy");
    fireEvent.click(button);

    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it.skip("test cut button", async () => {
    const onCut = vi.fn();

    render(
      <LoideToolbarEditor
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onSearch={vi.fn()}
        onPaste={vi.fn()}
        onCopy={vi.fn()}
        onCut={onCut}
        onDownloadTab={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Cut");
    fireEvent.click(button);

    expect(onCut).toHaveBeenCalledTimes(1);
  });

  it("test download content tab button", async () => {
    const onDownloadTab = vi.fn();

    render(
      <LoideToolbarEditor
        onUndo={vi.fn()}
        onRedo={vi.fn()}
        onSearch={vi.fn()}
        onPaste={vi.fn()}
        onCopy={vi.fn()}
        onCut={vi.fn()}
        onDownloadTab={onDownloadTab}
      />,
    );

    const button = await screen.findByTitle("Download content");
    fireEvent.click(button);

    expect(onDownloadTab).toHaveBeenCalledTimes(1);
  });
});
