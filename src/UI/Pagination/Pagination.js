import React from "react";
import Button from "../Button/Button";

function Pagination({ page, list, amount,updatePage }) {

  return (
    <div className="pagination-table">
      <Button
        disabledFlag={!(page > 1)}
        colorText="white"
        background="#061A40"
        clickHandler={() => {
          updatePage(page - 1);
        }}
        text="<<"
      />

      <span>
        {page} ( {Math.floor(list.length / amount) + (list.length%amount!==0?1:0)})
      </span>
      <Button
        disabledFlag={!(list.length > page * amount)}
        colorText="white"
        background="#061A40"
        clickHandler={() => {
          updatePage(page + 1);
        }}
        text=">>"
      />
    </div>
  );
}

export default Pagination;
