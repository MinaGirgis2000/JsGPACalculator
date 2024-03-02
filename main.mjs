import { GPA } from "./GPA.js";
import * as courses from "./courses.js";

const allCourses = [new GPA(courses.course1), new GPA(courses.course2), new GPA(courses.course3), new GPA(courses.course4), 
                    new GPA(courses.course5), new GPA(courses.course6), new GPA(courses.course7), new GPA(courses.course8),
                    new GPA(courses.course9)];

console.log("Freshman GPA: " + courses.GPA9);
console.log("Sophomore GPA: " + courses.GPA10);

let currentGPA = 0;
let currentCredits = 0;
let courseOutput = "";
for (const course of allCourses) {

    currentGPA += course.value * course.creditsEarned;
    currentCredits += course.creditsEarned;

    courseOutput += course.name;

    courseOutput += "\t\t\t";
    if (course.name.length < 8) {
        courseOutput += "\t";
    }

    courseOutput = (typeof course.finalGrade == "string") ? courseOutput + course.finalGrade + "\t" : courseOutput + course.finalGrade.toFixed(2) + "\t" + course.letter;
    try {
        courseOutput += "\t  " + course.value.toFixed(2) + "\t  ";
    } catch (TypeError) {
        courseOutput += "\t  " + 0 + "\t  ";
    }
    
    if (typeof course.grades != "string") {
        for (const grade of course.grades) {
            courseOutput += grade.toFixed(1) + "\t  ";
        }
        courseOutput += course.midterm + "\t   " + course.final;
    }
    
    courseOutput += "\n";
    
}

console.log("Junior GPA: " + (currentGPA / currentCredits));

currentGPA += courses.prevGPA * courses.prevCredits;
currentGPA /= currentCredits + courses.prevCredits;
console.log("GPA: " + currentGPA);

console.log("\nCLASS\t\t\t|   \tGRADES\t\t|  GPA\t|  MP1\t|  MP2\t|  MP3\t|  MP4\t|  Mid\t| Final\t|");
console.log("--------------------------------------------------------------------------------------------------------|");
console.log(courseOutput + "\n");
