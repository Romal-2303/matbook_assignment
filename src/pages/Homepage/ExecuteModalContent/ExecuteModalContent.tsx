import classes from "./ExecuteModalContent.module.scss";

const ExecuteModalContent = () => {
  return (
    <div>
      <p className={classes["make-sure-text"]}>
        "Are you sure you want to Delete 'Process_Name'?
      </p>
      <p className={classes["warning-text"]}>You cannot Undo this step</p>
    </div>
  );
};

export default ExecuteModalContent;
