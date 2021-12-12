import React from "react";
import { useState } from "react";
import styles from "./StudentData.module.css";
import TagForm from "../tag/TagForm";
import Tag from "../tag/Tag";
import OpenIcon from "../icons/OpenIcon";
import CloseIcon from "../icons/CloseIcon";


const UserDataCard = ({
  index,
  img,
  firstName,
  lastName,
  email,
  company,
  skill,
  averageGrade,
  grades,
  tags,
  addTag,
}) => {
  const [visibleGrades, visibleGradesSet] = useState(false);
  return (
    <div className={styles.container}>
      <img src={img} className={styles.avatar} alt="avatar" />
      <h1
        className={styles.name}
      >{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h1>
      <div className={styles.content}>
        <div>Email: {email}</div>
        <div>Company: {company}</div>
        <div>Skill: {skill}</div>
        <div>Average: {averageGrade}%</div>
        {visibleGrades && (
          <div className={styles.extendedContent}>
            {grades.map((grade, index) => {
              return (
                <div key={index.toString()}>
                  {`test${index}:\xa0\xa0\xa0\xa0\xa0\xa0${grade}%`}
                </div>
              );
            })}
            {tags.length > 0
              ? tags.map((tag, index) => {
                  return <Tag key={index.toString()} tag={tag} />;
                })
              : null}
            <TagForm index={index} addTag={addTag} />
          </div>
        )}
      </div>
      {visibleGrades ? (
        <CloseIcon
          className={styles.expandBtn}
          visibleGradesSet={visibleGradesSet}
          visibleGrades={visibleGrades}
        />
      ) : (
        <OpenIcon
          className={styles.expandBtn}
          visibleGradesSet={visibleGradesSet}
          visibleGrades={visibleGrades}
        />
      )}
    </div>
  );
};

export default UserDataCard;