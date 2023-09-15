import styled from "../../styles/spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styled.spinner}>
      <div className={styled.spinner_inner}></div>
    </div>
  );
};

export { Spinner };
