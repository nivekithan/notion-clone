import { Fragment, useState } from "react";

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
  DeleteConformation
} from "./";

import {Questions} from "../../api/questions"

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


  const testQuestions = new Questions()
  testQuestions.append({
    ans : {"ans" : "ans"},
    ques : {"ques" : "ques"},
    id : "12343"
  })

  testQuestions.append({
    ans : {"second" : "2"},
    ques : {"ques" : "q"},
    id : "2344"
  })

  testQuestions.append({
    ans : {"third" : "3"},
    ques : {"ques" : "34"},
    id : "1202"
  })

  
  
  testQuestions.insert({
    ans : {"five" : "5"},
    ques : {"five" : "ques"},
    id : "0098"
  }, {
    beforeID : "1202"
  })

  testQuestions.insert({
    ans : {"four" : "4"},
    "ques" : {"four" : "543"},
    id : "675849",
  }, {
    afterID : "0098"
  })

  console.log(testQuestions)

  // -----------------------------------------------------------------------
  return (
    <Fragment>
      <section className={utility.section.join(" ")}>
        {[addNewDaysComp, ...days]}
      </section>
    </Fragment>
  );
};

const DayCompents = ({ day }: { day: DaysINT }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const updateDayMutate = useUpdateDays();
  const [isDeleteConform, setIsDeleteConform] = useState<boolean>(false);
  const deleteMutate = useDeleteDays();

  const onEditClick: ButtonClick = (e) => {
    e.preventDefault();
    setIsEditable(true);
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
  // Delete Conforming component details
  const onDeleteConformCancel: ButtonClick = (e) => {
    e.preventDefault();
    setIsDeleteConform(false);
  };

  const onDeleteConformDelete: ButtonClick = (e) => {
    e.preventDefault();
    deleteMutate.mutate({
      id: day._id,
      stateFunc: () => {
        setIsDeleteConform(false);
      },
    });
  };
  const onDeleteClick: ButtonClick = (e) => {
    e.preventDefault();
    setIsDeleteConform(true);
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

      {isDeleteConform ? (
        <DeleteConformation
          onDeleteClick={onDeleteConformDelete}
          onCancelClick={onDeleteConformCancel}
        />
      ) : null}
    </section>
  );
};
