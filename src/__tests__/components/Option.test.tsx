import { render } from "@testing-library/react";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";
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
      />
    );
    expect(baseElement).toBeDefined();
  });

  it("tests delete option button", () => {
    const onDeleteOption = jest.fn();
    const { getByTitle } = render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onDeleteOption={onDeleteOption}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );
    const button = getByTitle("Delete option");
    fireEvent.click(button);
    expect(onDeleteOption).toHaveBeenCalledTimes(1);
  });

  it("render Name label", () => {
    const { getByText } = render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );
    getByText("Name");
  });

  it("test select", async () => {
    const onChangeOptionType = jest.fn();

    const { getByText, findByTestId } = render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onChangeOptionType={onChangeOptionType}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );
    expect(getByText(optionsAvailable[0].name)).toBeInTheDocument();

    const select = await findByTestId("select-name-options");
    expect(select.getAttribute("value")).toBe("free choice");
    fireEvent.ionChange(select, "silent");
    expect(onChangeOptionType).toBeCalledTimes(1);
  });

  it("test word argument true", async () => {
    let newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];
    const { queryByText } = render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );
    expect(queryByText("Value")).toBeInTheDocument();
  });

  it("test word argument false", async () => {
    let newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: false,
        description: "Missing description",
      },
    ];
    const { queryByText } = render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );
    expect(queryByText("Value")).not.toBeInTheDocument();
  });

  it("test disable option", async () => {
    const onChangeDisableOption = jest.fn();
    const onChangeOptionType = jest.fn();
    const { findByText } = render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        disabled={false}
        onChangeDisableOption={onChangeDisableOption}
        onChangeOptionType={onChangeOptionType}
      />
    );
    const badge = await findByText("Option 1");
    fireEvent.click(badge);
    expect(onChangeDisableOption).toBeCalledTimes(1);
  });
});

describe("<OptionTextValue />", () => {
  it("test change input text", async () => {
    let newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = jest.fn();

    const { findByPlaceholderText } = render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );

    const input = await findByPlaceholderText("Insert a value");

    fireEvent.ionChange(input, "--filter");

    expect(onChangeOptionValues).toBeCalledTimes(1);
  });

  it("test add input text", async () => {
    let newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = jest.fn();

    const { findByTitle, findAllByTestId } = render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );

    const button = await findByTitle("Add value");

    let inputs = await findAllByTestId("option-text-value-item");

    expect(inputs.length).toBe(1);

    fireEvent.click(button);

    expect(onChangeOptionValues).toBeCalledTimes(1);

    inputs = await findAllByTestId("option-text-value-item");

    expect(inputs.length).toBe(2);
  });

  it("test delete swipe", async () => {
    const onChangeOptionValues = jest.fn();
    const { findByTestId } = render(
      <Option
        optionsAvailable={optionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={jest.fn()}
      />
    );

    const swipeOpt = await findByTestId("swipe-delete");

    fireEvent.ionSwipe(swipeOpt, "right");

    expect(onChangeOptionValues).toBeCalledTimes(1);
  });

  it.skip("test add and delete input text", async () => {
    let newOptionsAvailable: IOptionsData[] = [
      {
        name: "Free choice",
        value: "free choice",
        word_argument: true,
        description: "Missing description",
      },
    ];

    const onChangeOptionValues = jest.fn();

    // const ref = {
    //     current: {
    //         close: jest.fn(),
    //     },
    // };

    const { findByTitle, findAllByPlaceholderText, findAllByTitle } = render(
      <Option
        optionsAvailable={newOptionsAvailable}
        optionData={optionData}
        onChangeOptionValues={onChangeOptionValues}
        disabled={false}
        onChangeDisableOption={function (id: number, value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    const button = await findByTitle("Add value");

    let inputs = await findAllByPlaceholderText("Insert a value");
    expect(inputs.length).toBe(1);

    fireEvent.click(button);

    expect(onChangeOptionValues).toBeCalledTimes(1);

    inputs = await findAllByPlaceholderText("Insert a value");

    const buttonsDelete = await findAllByTitle("Delete option value");
    fireEvent.click(buttonsDelete[0]);

    expect(onChangeOptionValues).toBeCalledTimes(2);

    inputs = await findAllByPlaceholderText("Insert a value");
    expect(inputs.length).toBe(1);
  });
});
