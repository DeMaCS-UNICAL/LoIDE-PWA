import { fireEvent, render } from "@testing-library/react";
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
      />
    );
    expect(baseElement).toBeDefined();
  });

  it("test undo button", async () => {
    const onUndo = jest.fn();

    const { findByTitle } = render(
      <LoideToolbarEditor
        onUndo={onUndo}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />
    );

    const button = await findByTitle("Undo");
    fireEvent.click(button);

    expect(onUndo).toBeCalledTimes(1);
  });

  it("test redo button", async () => {
    const onRedo = jest.fn();

    const { findByTitle } = render(
      <LoideToolbarEditor
        onRedo={onRedo}
        onUndo={jest.fn()}
        onSearch={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />
    );

    const button = await findByTitle("Redo");
    fireEvent.click(button);

    expect(onRedo).toBeCalledTimes(1);
  });

  it("test search button", async () => {
    const onSearch = jest.fn();

    const { findByTitle } = render(
      <LoideToolbarEditor
        onSearch={onSearch}
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onCopy={jest.fn()}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />
    );

    const button = await findByTitle("Search");
    fireEvent.click(button);

    expect(onSearch).toBeCalledTimes(1);
  });

  it("test paste button", async () => {
    const onPaste = jest.fn();

    const { findByTitle } = render(
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

    const button = await findByTitle("Paste");
    fireEvent.click(button);

    expect(onPaste).toBeCalledTimes(1);
  });

  it.skip("test copy button", async () => {
    const onCopy = jest.fn();

    const { findByTitle } = render(
      <LoideToolbarEditor
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onPaste={jest.fn()}
        onCopy={onCopy}
        onCut={jest.fn()}
        onDownloadTab={jest.fn()}
      />
    );

    const button = await findByTitle("Copy");
    fireEvent.click(button);

    expect(onCopy).toBeCalledTimes(1);
  });

  it.skip("test cut button", async () => {
    const onCut = jest.fn();

    const { findByTitle } = render(
      <LoideToolbarEditor
        onUndo={jest.fn()}
        onRedo={jest.fn()}
        onSearch={jest.fn()}
        onPaste={jest.fn()}
        onCopy={jest.fn()}
        onCut={onCut}
        onDownloadTab={jest.fn()}
      />
    );

    const button = await findByTitle("Cut");
    fireEvent.click(button);

    expect(onCut).toBeCalledTimes(1);
  });

  it("test download content tab button", async () => {
    const onDownloadTab = jest.fn();

    const { findByTitle } = render(
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

    const button = await findByTitle("Download content");
    fireEvent.click(button);

    expect(onDownloadTab).toBeCalledTimes(1);
  });
});
