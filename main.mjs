import { GPA } from "./GPA.js";
import courses from "./courses.json"
// import courses2 from "./courses2.json"
// import courses3 from "./courses3.json";
// import courses4 from "./courses4.json";

const allCourses = [courses];  // , courses2, courses3, courses4];  // <-- can add multiple grades to accurate accurate values for each one

let currentGPAValues = [0, 0, 0]; // [weighted GPA, unweighted GPA, credits]
let gradeGPAValues = [0, 0, 0]; // [weighted GPA, unweighted GPA, credits]
let courseOutput = "";

for (let i = 0; i < allCourses.length; i++) {
    for (let k = 0; k < allCourses[i].length; k++) {

        const course = new GPA(allCourses[i][k]);

        gradeGPAValues[0] += course.weightedValue * course.creditsEarned;
        gradeGPAValues[1] += course.unweightedValue * course.creditsEarned;
        gradeGPAValues[2] += course.creditsEarned;

        courseOutput += course.name.substring(0, 15).toUpperCase();    
        if (course.name.length < 8) {
            courseOutput += "\t";
        }

        courseOutput += "\t ";
        courseOutput += (!(typeof course.finalGrade == "string")) ? course.finalGrade.toFixed(1) : "";
        courseOutput += "\t" + course.letter + "\t" + course.weightedValue.toFixed(2) + "\t   " + course.unweightedValue.toFixed(2);
        courseOutput += "\n";
    }
    
    console.log((9 + i) + "th Grade Weighted GPA: " + (gradeGPAValues[0] / gradeGPAValues[2]));
    console.log((9 + i) + "th Grade Unweighted GPA: " + (gradeGPAValues[1] / gradeGPAValues[2]));
    console.log("----------------------------------------------------|");
    console.log("CLASS\t\t|  GRADES  |  W Value  |  UW Value  |");
    console.log("----------------------------------------------------|");
    console.log(courseOutput + "\n");
    
    for (let i = 0; i < currentGPAValues.length; i++) {
        currentGPAValues[i] += gradeGPAValues[i];
    }

    courseOutput = "";
    gradeGPAValues = [0, 0, 0];
}

console.log("Weighted GPA: " + (currentGPAValues[0] / currentGPAValues[2]));
console.log("Unweighted GPA: " + (currentGPAValues[1] / currentGPAValues[2]));