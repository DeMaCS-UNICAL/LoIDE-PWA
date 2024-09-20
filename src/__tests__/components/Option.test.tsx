import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Option from "../../components/Option";
import { IOptionsData } from "../../lib/LoideAPIInterfaces";
import { ISolverOption } from "../../lib/LoideInterfaces";

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
        onChangeDisableOption={jest.fn()}
      />,
    );
    expect(baseElement).toBeDefined();
  });

  it("tests delete option button", () => {
    const onDeleteOption = jest.fn();
    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onDeleteOption={onDeleteOption}
        disabled={false}
        onChangeDisableOption={jest.fn()}
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
        onChangeDisableOption={jest.fn()}
      />,
    );
    screen.getByText("Name");
  });

  it("test select", async () => {
    const onChangeOptionType = jest.fn();

    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onChangeOptionType={onChangeOptionType}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />,
    );
    expect(screen.getByText(optionsAvailable[0].name)).toBeInTheDocument();

    const select = await screen.findByTestId("select-name-options");
    expect(select.getAttribute("value")).toBe("free choice");
    fireEvent.ionChange(select, "silent");
    expect(onChangeOptionType).toBeCalledTimes(1);
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
        onChangeDisableOption={jest.fn()}
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
        onChangeDisableOption={jest.fn()}
      />,
    );
    expect(screen.queryByText("Value")).not.toBeInTheDocument();
  });

  it("test disable option", async () => {
    const onChangeDisableOption = jest.fn();
    const onChangeOptionType = jest.fn();
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
    fireEvent.click(badge);
    expect(onChangeDisableOption).toBeCalledTimes(1);
  });
});

describe("<OptionTextValue />", () => {
  it("test change input text", async () => {
    const newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = jest.fn();

    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />,
    );

    const input = await screen.findByPlaceholderText("Insert a value");

    fireEvent.ionChange(input, "--filter");

    expect(onChangeOptionValues).toBeCalledTimes(1);
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

    const onChangeOptionValues = jest.fn();

    render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />,
    );

    const button = await screen.findByTitle("Add value");

    let inputs = await screen.findAllByTestId("option-text-value-item");

    expect(inputs.length).toBe(1);

    fireEvent.click(button);

    expect(onChangeOptionValues).toBeCalledTimes(1);

    inputs = await screen.findAllByTestId("option-text-value-item");

    expect(inputs.length).toBe(2);
  });

  it("test delete swipe", async () => {
    const onChangeOptionValues = jest.fn();
    render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />,
    );

    const swipeOpt = await screen.findByTestId("swipe-delete");

    fireEvent.ionSwipe(swipeOpt, "right");

    expect(onChangeOptionValues).toBeCalledTimes(1);
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

    const onChangeOptionValues = jest.fn();
    const onChangeDisableOption = jest.fn();

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

    fireEvent.click(button);

    expect(onChangeOptionValues).toBeCalledTimes(1);

    inputs = await screen.findAllByPlaceholderText("Insert a value");

    const buttonsDelete = await screen.findAllByTitle("Delete option value");
    fireEvent.click(buttonsDelete[0]);

    expect(onChangeOptionValues).toBeCalledTimes(2);

    inputs = await screen.findAllByPlaceholderText("Insert a value");
    expect(inputs.length).toBe(1);
  });
});
