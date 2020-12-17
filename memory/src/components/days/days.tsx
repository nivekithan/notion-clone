import { useState } from "react";

// Hooks

import {
  useDeleteDays,
  useCreateDays,
  useUpdateDays,
  useDays,
} from "../../hooks";
// Components

import {
  SingleDay,
  AddNewDays,
  Form,
  ButtonClick,
  Utility,
  FormInputs,
  DaysINT,
} from "./";
import { DeleteConformation } from "./deleteConform";
// -----------------------------------------------------------------------------------------------

const utility: Utility = {
  section: ["mx-9%", "flex", "flex-wrap", "gap-9"],
  "bg-rectangle": ["bg-myblue-400", "inline-block"],
};

// ---------------------------------------------------------------------------------------------------
// Renders the days the component

export const Days = () => {
  const [isNewDays, setisNewDays] = useState<boolean>(false);

  const daysQuery = useDays();
  const createDays = useCreateDays();

  if (daysQuery.isLoading) return <h1>It is loading ..........</h1>;
  if (daysQuery.isError)
    return <h1>There is something wrong {daysQuery.error}</h1>;
  if (!daysQuery.data) return null;

  // -----------------------------------------------------------------------
  // On Add New Days

  const onAddNewDaysButtonClick: ButtonClick = (e) => {
    e.preventDefault();
    setisNewDays(true);
  };

  const onAddNewDaysFormSubmit = (data: FormInputs) => {
    createDays.mutate({ data, stateFun: () => setisNewDays(false) });
  };

  const onAddNewDaysFormCancelClick: ButtonClick = (e) => {
    e.preventDefault();
    setisNewDays(false);
  };

  const onAddNewDaysFormDefualtValue = {
    name: "",
    tags: "",
  };

  const addNewDaysComp = (
    <section className={utility["bg-rectangle"].join(" ")}>
      {!isNewDays ? (
        <div>
          <AddNewDays onClick={onAddNewDaysButtonClick} />
        </div>
      ) : (
        <div>
          <Form
            onSubmit={onAddNewDaysFormSubmit}
            onCancel={onAddNewDaysFormCancelClick}
            defualtValue={onAddNewDaysFormDefualtValue}
          />
        </div>
      )}
    </section>
  );

  // -----------------------------------------------------------------------
  // Section for Days component

  const days = daysQuery.data.map((day) => {
    return <DayCompents day={day} key={day._id} />;
  });

  // -----------------------------------------------------------------------
  return (
    <section className={utility.section.join(" ")}>
      {[addNewDaysComp, ...days, DeleteConformation()]}
    </section>
  );
};

const DayCompents = ({ day }: { day: DaysINT }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const updateDayMutate = useUpdateDays();
  const deleteDaysMutate = useDeleteDays();
  const onEditClick: ButtonClick = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };
  const onDeleteClick = () => {
    deleteDaysMutate.mutate({ id: day._id });
  };

  const onCancelForm: ButtonClick = (e) => {
    e.preventDefault();
    setIsEditable(false);
  };

  const defualtValueForm: FormInputs = {
    name: day.name,
    tags: day.tags.join(";"),
  };

  const onSubmitForm = (data: FormInputs) => {
    updateDayMutate.mutate({
      data,
      day_id: day._id,
      stateFunc: () => {
        setIsEditable(false);
      },
    });
  };

  return (
    <section className={utility["bg-rectangle"].join(" ")}>
      {isEditable ? (
        <Form
          onCancel={onCancelForm}
          defualtValue={defualtValueForm}
          onSubmit={onSubmitForm}
        />
      ) : (
        <SingleDay
          onEditClick={onEditClick}
          day={day}
          onDeleteClick={onDeleteClick}
        />
      )}
    </section>
  );
};
