import React from 'react';
import TrashIcon from '../resource/TrashIcon.svg';
import '../css/ColorBlock.css';

const ColorBlock = ({ colorDetail, handleClick, showDelete, showDeleteBlock }) => {
  /**
   * Condition to check if the block needs to show color hex or to show a delete icon (case: saved palette)
   */
  let colorCode = colorDetail ? "#" + colorDetail.hex : "#f1f1f1";
  /**
   * renders trash icon for items in cart
   * NOTE: As the color of the trash icon is white, the icon is not visible on few color block like white. 
   */

  let icon = showDelete
    ? (<>
      <div className="DeleteIconStyle"><img src={TrashIcon} alt="X" /></div>
      <div style={{ clear: "both" }} />
    </>)
    : "";

  /**
   * renders a block with trash icon for each saved palette
   */

  let deleteBlock = showDeleteBlock ? <img src={TrashIcon} alt="X" /> : ""

  return (
    <>
      <div
        className="Block"
        style={{ backgroundColor: colorCode }}
        onClick={typeof handleClick == "function" ? handleClick : () => { }}>
        {icon}
        <div className={showDelete ? "BlockLabel" : "BlockIcon"}>
          {showDeleteBlock ? deleteBlock : colorCode}
        </div>
      </div>
    </>
  )
}
export default ColorBlock;