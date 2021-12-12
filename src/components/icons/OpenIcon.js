import React from "react";
import styles from "./icons.module.css";

//Ensure that @fortawesome is added to node_modules for Font Awesome Icon use
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Icon imported w/ Font Awesome icons, please install Font Awesome into node_modules 
const OpenIcon = ({ visibleGradesSet, visibleGrades }) => {
  return (
    <FontAwesomeIcon
      className={styles.expandBtn}
      onClick={() => {
        visibleGradesSet(!visibleGrades);
      }}
      icon={ faPlus }
      viewBox="0 0 300 300"
      color="#bebebe"
    >
    </FontAwesomeIcon>
  );
};

export default OpenIcon;