import { useState, useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import {  Link } from "react-router-dom";
// -----------------------------------------------------------------------------------------------

interface DaysINF {
  tags: string[];
  _id: string;
  name: string;
  group_id: string;
}

interface Utility {
  [index: string]: string[];
}

interface FormInputs {
  name: string;
  tags: string;
}

interface FormsINT {
  onSubmit: (data: FormInputs) => void;
  onCancel: ButtonClick;
  defualtValue: {
    name: string;
    tags: string;
  };
}

type ButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
// ---------------------------------------------------------------------------------------------------
// Renders the days the component
export const Days = () => {
  const [days, setDays] = useState<DaysINF[] | null>(null);
  const [isNewDays, setisNewDays] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const url: string = "http://localhost:4000/get/days";
      setDays((await (await fetch(url)).json()).days);
    })();
  }, [isNewDays, hasChanged]);

  const utility: Utility = {
    section: ["mx-9%", "flex", "flex-wrap", "gap-9"],
  };

  const output = days ? (
    <section className={utility.section.join(" ")}>
      <AddNewDays isNewDays={isNewDays} setisNewDays={setisNewDays} />
      <Day days={days} setHasChanged={setHasChanged} />
    </section>
  ) : (
    <h1>I am before</h1>
  );

  return <section>{output}</section>;
};
// ---------------------------------------------------------------------------------------------------------

const AddNewDays = ({
  isNewDays,
  setisNewDays,
}: {
  isNewDays: boolean;
  setisNewDays: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const utility: Utility = {
    "bg-rectangle": ["bg-myblue-400", "inline-block"],
    contentWrapper: [
      "w-box292",
      "h-box201",
      "mx-xl",
      "my-xxl",
      "flex",
      "justify-center",
      "items-center",
    ],
    textWrapper: ["flex", "flex-col", "items-center", "gap-y-4"],
    text: ["text-white", "text-4xl", "font-serif", "font-bold"],
  };

  const onSubmit = (data: FormInputs) => {
    const { name, tags } = data;
    const tagList = tags.trim().split(";");

    const url = "http://localhost:4000/post/newgroup";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, tags: tagList }),
      headers: {
        "Content-type": "application/json ; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(() => {
      setisNewDays(false);
    });
  };

  const onCancel: ButtonClick = (e) => {
    e.preventDefault();
    setisNewDays(false);
  };

  const Ouput = () => {
    if (isNewDays) {
      const defualtValue = {
        name: "",
        tags: "",
      };

      return (
        <Forms
          onSubmit={onSubmit}
          onCancel={onCancel}
          defualtValue={defualtValue}
        />
      );
    } else {
      return (
        <section className={utility["bg-rectangle"].join(" ")}>
          <section className={utility.contentWrapper.join(" ")}>
            <ul className={utility.textWrapper.join(" ")}>
              <li className={utility.text.join(" ")}>New Day</li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setisNewDays(true);
                }}
              >
                <HiOutlinePlusCircle color={"#ffffff"} size="27px" />
              </button>
            </ul>
          </section>
        </section>
      );
    }
  };

  return <Ouput />;
};

// --------------------------------------------------------------------------------------------

const Day = ({
  days,
  setHasChanged,
}: {
  days: DaysINF[];
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const output = days.map((day) => {
    return (
      <SingleDay
        day={day}
        setHasChanged={setHasChanged}
        key={day._id}
        dataKey={day._id}
      />
    );
  });
  return <Fragment>{output}</Fragment>;
};

// Componenet responsible for day component other than new day component

const SingleDay = ({
  day,
  setHasChanged,
  dataKey,
}: {
  day: DaysINF;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
  dataKey: string;
}) => {
  const [Editable, setEditable] = useState<boolean>(false);

  const Output = () => {
    if (Editable) {
      const defaultValue = {
        name: day.name,
        tags: day.tags.join(";"),
      };

      const onSubmit = (data: FormInputs) => {
        const body = {
          name: data.name,
          tags: (data.tags.trim()).split(";"),
        };

        const url = "http://localhost:4000/put/day?id=" + day._id;

        fetch(url, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json ; charset=utf-8",
          },
        })
          .then(() => setEditable(false))
          .then(() => setHasChanged((state) => !state));
      };

      const onCancel: ButtonClick = (e) => {
        e.preventDefault();
        setEditable(false);
      };
      // Returning the output
      return (
        <Forms
          defualtValue={defaultValue}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    } else {
      const utility: Utility = {
        sectionWrapper: ["w-box340", "bg-mygrey-400", "inline-block"],
        contentWrapper: [
          "w-box292",
          "h-box201",
          "mx-xl",
          "my-xxl",
          "gap-y-6",
          "flex",
          "flex-col",
        ],
        tagWrapper: ["h-box94", "overflow-y-auto"],
        text: ["text-white", "text-2xl", "font-bold", "font-serif"],
      };
      const onEditClick: ButtonClick = (e) => {
        e.preventDefault();
        setEditable(true);
      };

      return (
        <section className={utility.sectionWrapper.join(" ")}>
          <ul className={utility.contentWrapper.join(" ")}>
            <li className={utility.text.join(" ")}>{day.name}</li>
            <li className={utility.tagWrapper.join(" ")}>
              <TagWrapper tags={day.tags} />
            </li>
            <li>
              <ButtonsWrapper onEditClick={onEditClick} dataKey={dataKey} />
            </li>
          </ul>
        </section>
      );
    }
  };

  return <Output />;
};
//----------------------------------------------------------------------------------------------------
const TagWrapper = ({ tags }: { tags: string[] }) => {
  const utility: Utility = {
    tagWrapper: ["flex", "flex-wrap", "gap-2"],
    tag: [
      "text-black",
      "px-4",
      "py-1.5",
      "rounded-full",
      "bg-white",
      "font-bold",
      "font-serif",
      "text-xs",
      "flex-none",
    ],
  };

  return (
    <ul className={utility.tagWrapper.join(" ")}>
      {tags.map((tag, index) => {
        return (
          <li className={utility.tag.join(" ")} key={index}>
            {tag}
          </li>
        );
      })}
    </ul>
  );
};

//-------------------------------------------------------------------------------------------------------------

const ButtonsWrapper = ({
  onEditClick,
  dataKey,
}: {
  onEditClick: ButtonClick;
  dataKey: string;
}) => {
  const utility: Utility = {
    buttonWrapper: ["flex", "flex-row", "justify-between", "items-center"],
    buttonText: ["text-white", "text-10", "font-serif", "font-bold"],
  };

  return (
    <ul className={utility.buttonWrapper.join(" ")}>
      <li>
        <button className={utility.buttonText.join(" ")}>Delete</button>
      </li>
      <li>
        <Buttons onEditClick={onEditClick} dataKey={dataKey} />
      </li>
    </ul>
  );
};

const Buttons = ({
  onEditClick,
  dataKey,
}: {
  onEditClick: ButtonClick;
  dataKey: string;
}) => {
  const utility: Utility = {
    buttonWrapper: ["flex", "flex-row", "gap-x-3", "items-center"],
    editButton: ["text-white", "text-sm", "font-serif", "font-bold"],
    startButton: [
      "text-white",
      "text-xs",
      "w-20",
      "bg-myblue-400",
      "rounded-full",
      "py-2.5",
      "font-bold",
    ],
  };

  return (
    <ul className={utility.buttonWrapper.join(" ")}>
      <li>
        <button className={utility.editButton.join(" ")} onClick={onEditClick}>
          Edit
        </button>{" "}
      </li>
      <li>
        <Link to={`/test/${dataKey}`}>
          <button className={utility.startButton.join(" ")}>Start</button>{" "}
        </Link>
      </li>
    </ul>
  );
};

// ------------------------------------------------------------------------------------------------------

const Forms = ({ onCancel, onSubmit, defualtValue }: FormsINT) => {
  const { register, handleSubmit } = useForm({
    defaultValues: defualtValue,
  });

  const utility = {
    "bg-rectangle": ["bg-myblue-400", "inline-block"],

    contentWrapperNew: [
      "w-box292",
      "h-box201",
      "mx-xl",
      "my-xxl",
      "flex",
      "flex-col",
    ],

    form: ["flex", "flex-col", "gap-6"],

    input: ["h-8", "rounded-md", "px-2"],

    submit: [
      "bg-black",
      "text-white",
      "rounded-md",
      "h-9",
      "text-xs",
      "uppercase",
      "font-serif",
      "font-bold",
      "tracking-submit",
      "cursor-pointer",
    ],

    cancelText: ["text-white", "font-serif", "font-xs", "font-bold"],
  };

  return (
    <section className={utility["bg-rectangle"].join(" ")}>
      <section className={utility.contentWrapperNew.join(" ")}>
        <form
          className={utility.form.join(" ")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            ref={register({ required: true })}
            name="name"
            placeholder="Name"
            className={utility.input.join(" ")}
          />
          <input
            ref={register({ required: true })}
            name="tags"
            placeholder="Tags"
            className={utility.input.join(" ")}
          />
          <input
            type="submit"
            className={utility.submit.join(" ")}
            value="Submit"
          />
        </form>
        <button className={utility.cancelText.join(" ")} onClick={onCancel}>
          Cancel
        </button>
      </section>
    </section>
  );
};
