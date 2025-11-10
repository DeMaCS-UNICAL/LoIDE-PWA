import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Option from "../../components/Option";
import { IOptionsData } from "../../lib/LoideAPIInterfaces";
import { ISolverOption } from "../../lib/LoideInterfaces";
import { vi } from "vitest";

const optionsAvailable: IOptionsData[] = [
  {
    name: "Free choice",
    value: "free choice",
    word_argument: true,
    description: "Missing description",
  },
  {
    name: "Silent",
    value: "silent",
    word_argument: false,
    description: "Missing description",
  },
];
const optionData: ISolverOption = {
  id: 0,
  name: "free choice",
  values: [""],
  disabled: false,
};

describe("<Option />", () => {
  it("renders without crashing", () => {
    const { baseElement } = render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );
    expect(baseElement).toBeDefined();
  });

  it("tests delete option button", () => {
    const onDeleteOption = vi.fn();
    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onDeleteOption={onDeleteOption}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );
    const button = screen.getByTitle("Delete option");
    fireEvent.click(button);
    expect(onDeleteOption).toHaveBeenCalledTimes(1);
  });

  it("render Name label", () => {
    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );
    screen.getByText("Name");
  });

  it.skip("test select", async () => {
    //TODO skipped due to changes in test APIs
    const onChangeOptionType = vi.fn();
    const user = userEvent.setup();

    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onChangeOptionType={onChangeOptionType}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );
    expect(screen.getByText(optionsAvailable[0].name)).toBeInTheDocument();

    const select = await screen.findByTestId("select-name-options");
    expect(select.getAttribute("value")).toBe("free choice");
    await user.selectOptions(select, "silent");
    expect(onChangeOptionType).toHaveBeenCalledTimes(1);
  });

  it("test word argument true", async () => {
    const newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];
    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("test word argument false", async () => {
    const newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: false,
        description: "Missing description",
      },
    ];
    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );
    expect(screen.queryByText("Value")).not.toBeInTheDocument();
  });

  it("test disable option", async () => {
    const onChangeDisableOption = vi.fn();
    const onChangeOptionType = vi.fn();
    const user = userEvent.setup();
    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={onChangeDisableOption}
        onChangeOptionType={onChangeOptionType}
      />,
    );
    const badge = await screen.findByText("Option 1");
    await user.click(badge);
    expect(onChangeDisableOption).toHaveBeenCalledTimes(1);
  });
});

describe("<OptionTextValue />", () => {
  it.skip("test change input text", async () => {
    // TODO skipped because it is testing a DLV option that may no longer be there
    const newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = vi.fn();
    const user = userEvent.setup();

    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );

    const input = await screen.findByPlaceholderText("Insert a value");

    await user.selectOptions(input, "--filter");

    expect(onChangeOptionValues).toHaveBeenCalledTimes(1);
  });

  it("test add input text", async () => {
    const newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = vi.fn();
    const user = userEvent.setup();

    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );

    const button = await screen.findByTitle("Add value");

    let inputs = await screen.findAllByTestId("option-text-value-item");

    expect(inputs.length).toBe(1);

    await user.click(button);

    expect(onChangeOptionValues).toHaveBeenCalledTimes(1);

    inputs = await screen.findAllByTestId("option-text-value-item");

    expect(inputs.length).toBe(2);
  });

  it("test delete swipe", async () => {
    const onChangeOptionValues = vi.fn();
    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={vi.fn()}
      />,
    );

    // TODO fix swipe command
    // const swipeOpt = await screen.findByTestId("swipe-delete");

    // fireEvent(swipeOpt, "onSwipeLeft");

    // expect(onChangeOptionValues).toHaveBeenCalledTimes(1);
  });

  it.skip("test add and delete input text", async () => {
    const newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = vi.fn();
    const onChangeDisableOption = vi.fn();
    const user = userEvent.setup();

    // const ref = {
    //     current: {
    //         close: jest.fn(),
    //     },
    // };

    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={onChangeDisableOption}
      />,
    );

    const button = await screen.findByTitle("Add value");

    let inputs = await screen.findAllByPlaceholderText("Insert a value");
    expect(inputs.length).toBe(1);

    await user.click(button);

    expect(onChangeOptionValues).toHaveBeenCalledTimes(1);

    inputs = await screen.findAllByPlaceholderText("Insert a value");

    const buttonsDelete = await screen.findAllByTitle("Delete option value");
    await user.click(buttonsDelete[0]);

    expect(onChangeOptionValues).toHaveBeenCalledTimes(2);

    inputs = await screen.findAllByPlaceholderText("Insert a value");
    expect(inputs.length).toBe(1);
  });
});
