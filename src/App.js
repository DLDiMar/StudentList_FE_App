import React, { useState, useEffect } from "react";
import UserDataCard from "./components/studentData/StudentData";
import ContentFilter from "./components/contentFilter/ContentFilter";
import styles from "./App.module.css";

function App() {

  // State Hooks for features instead of traditional class call
  const [studentDataInfo, studentDataSet] = useState([]);
  const [contentFilter, contentFilterSet] = useState([]);
  const [nameFilter, nameFilterSet] = useState([]);
  const [tagFilter, tagFilterSet] = useState([]);

  //Call to API URL
  useEffect(() => {
    fetchUrl(`https://api.hatchways.io/assessment/students`); 
  }, []);

  async function fetchUrl(url) {
    const response = await fetch(url);
    const json = await response.json();

    let newStudent = [];
    
    json.students.map(student => {
      let addTags = student;
      addTags.tags = [];
      newStudent.push(addTags);
    });

    nameFilterSet(newStudent);
    contentFilterSet(newStudent);
    studentDataSet(newStudent);
    tagFilterSet(newStudent);
  }
  
  // filter functions for sorting content by name
  const nameFilterFunc = str => {

    let contentFilter = [];
    
    tagFilter.map(student => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(str)) {
        contentFilter.push(student);
      }
    });

    let newNameFilter = [];

    studentDataInfo.map(student => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(str)) {
        newNameFilter.push(student);
      }
    });

    nameFilterSet(newNameFilter);
    contentFilterSet(contentFilter);
  };

  // Tag adding function
  const addTag = (str, index) => {
    const tagForStudentData = [...studentDataInfo];
    tagForStudentData[index].tags.push(str);
    studentDataSet(tagForStudentData);
  };

  // Tag filtering function
  const tagFilterFunc = str => {
    if (str) {
      let newTagFilter = [];
      let newContentFilter = [];

      studentDataInfo.map(student => {

        let isTagged = false;
        
        student.tags.map(tag => {
          if (tag.includes(str)) {
            isTagged = true;
          }
        });
        
        if (isTagged) {
          newTagFilter.push(student);
        }
      });

      //Filter by tags
      contentFilter.map(student => {
        
        let isTagged = false;
        
        student.tags.map(tag => {
          if (tag.includes(str)) {
            isTagged = true;
          }
        });

        if (isTagged) {
          newContentFilter.push(student);
        }
      });

      tagFilterSet(newTagFilter);
      contentFilterSet(newContentFilter);
    } else {

      contentFilterSet(nameFilter);
      tagFilterSet(studentDataInfo);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.centralContainer}>
        <ContentFilter filterFunction={nameFilterFunc} type={`name`} />
        <ContentFilter filterFunction={tagFilterFunc} type={`tag`} />

        {contentFilter.map((student, index) => {

          // Function to find average of grades from JSON object
          function averager(array) {

            let sum = 0;

            for (let i = 0; i < array.length; i++) {
              sum += parseInt(array[i]);
            }

            let average = sum / array.length;
            return average;
          }

          const avgGrade = averager(student.grades);

          return (
            <UserDataCard
              key={index.toString()}
              index={index}
              img={student.pic}
              firstName={student.firstName}
              lastName={student.lastName}
              email={student.email}
              company={student.company}
              skill={student.skill}
              grades={student.grades}
              avgGrade={avgGrade}
              tags={student.tags}
              addTag={addTag}
            />
          );
        })}

      </div>
    </div>
  );
}

export default App;