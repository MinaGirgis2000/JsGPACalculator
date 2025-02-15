export class GPA {
    constructor(course) {
        this.name = course.name;
        this.grades = course.grades;
        this.midterm = (course.midterm == undefined) ? 0 : course.midterm;
        this.midterm2 = (course.midterm2 == undefined) ? 0 : course.midterm2;
        this.final = (course.final == undefined) ? 0 : course.final;
        this.credits = course.credits;
        this.level = course.level;
        this.labSem = (course.labSem == undefined) ? "None" : course.labSem;
        this.weightedValue = this.value(true);
        this.unweightedValue = this.value();
    }

    value(weighted=false) {
        const letters = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"]
        const academic = [4.3, 4, 3.7, 3.3, 3, 2.7, 2.3, 2, 1.7, 1.3, 1, 0.7, 0]
        const honors = [4.945, 4.6, 4.255, 3.795, 3.45, 3.105, 2.645, 2.3, 1.955, 1.338, 1.15, 0.805, 0]
        const advanced = [5.375, 5, 4.625, 4.125, 3.75, 3.375, 2.875, 2.5, 2.125, 1.625, 1.25, 0.875, 0]
        
        const letterIndex = letters.indexOf(this.letter);

        if (weighted) {
            if (this.level == "H" || this.level == "HONORS") {
                return honors[letterIndex];

            } else if (this.level == "AP" || this.level == "ADVANCED" || this.level == "ADVANCED PLACEMENT") {
                return advanced[letterIndex];
            }
        }
        
        return academic[letterIndex];
    }

    get finalGrade() {
        let nonZeros = 0;
        let sumGrade = 0;
        let totalPortion = 8;

        if (typeof this.grades == "string") {
            return this.grades.toUpperCase();

        } else {
            for (const grade of this.grades) {
                sumGrade += Math.round(grade);
                
                if (grade != 0) {
                    nonZeros++;
                
                } else {
                    totalPortion -= 2;
                }
            }
        }

        let midtermPortion = 1;
        let midterm2Portion = 0;
        let finalPortion = 1;
        
        if (this.midterm == 0) {
            midtermPortion = 0;

        } else if (nonZeros != 0) {
            
            if (this.labSem == "1" || this.labSem == "1ST" || this.labSem == "FIRST") {
                midtermPortion = 1.2;
                finalPortion = 0.8;
            
            } else if (this.labSem == "2" || this.labSem == "2ND" || this.labSem == "SECOND") {
                midtermPortion = 0.8;
                finalPortion = 1.2;
            }
        }

        if (this.midterm2 != 0) {
            finalPortion = 0.4;
            midterm2Portion = 0.6;
            midtermPortion = 1;
        }

        if (this.final == 0) {
            finalPortion = 0;
        }
        
        totalPortion += midtermPortion + midterm2Portion + finalPortion;
        return ((sumGrade / nonZeros) * (totalPortion - midtermPortion - midterm2Portion - finalPortion) / totalPortion) + (this.midterm * midtermPortion / totalPortion) + (this.midterm2 * midterm2Portion / totalPortion) + (this.final * finalPortion / totalPortion);
        
    }

    get letter() {    
        if (typeof this.grades == "string") {
            return this.grades.toUpperCase();
        
        } else if (this.finalGrade >= 100) {
            return "A+";
        }
        
        const letters = ["A", "B", "C", "D", "F"];
        const firstDigit = parseInt(this.finalGrade/10);        

        let letter;
        try {
            letter = letters[Math.abs(firstDigit - 9)];
        }
        catch {
            return "F"
        }   

        let secondDigit = this.finalGrade;
        for (let i = 0; i < firstDigit; i++) {
            secondDigit -= 10;
        }
        
        if (secondDigit >= 7.45 && firstDigit == 9) {
            return letter + "+";
        
        } else if (secondDigit >= 9.45) {
            letter = letters[letters.indexOf(letter) - 1];
            return letter + "-";
        
        } else {
            if (secondDigit < 1.45) {
                return letter + "-";
            
            } else if (secondDigit >= 5.45 && firstDigit != 9) {
                return letter + "+";
            }
           return letter
        }
    }

    get creditsEarned() { 
        if (typeof this.grades == "string") {
            return this.credits;
        }
        
        let nonZeros = 0;

        for (const grade of this.grades) {
            if (grade != 0) {
                nonZeros++;
            }
        }
        
        if (nonZeros == 4 || (nonZeros == 2 && this.credits == 2.5) || (nonZeros == 1 && this.credits == 1.25) || (nonZeros == 3 && this.credits == 3.75)) {
            return this.credits;
        
        } else if (this.credits >= 7.5) {
            
            if (nonZeros == 1) {
                return (this.labSem == "1" || this.labSem == "1ST" || this.labSem == "FIRST") ? ((this.credits - 2.5) / 2) : ((this.credits - 5) / 2);
            
            } else if (nonZeros == 2) {
                return (this.labSem == "1" || this.labSem == "1ST" || this.labSem == "FIRST") ? ((this.credits - 2.5) / 2 + 2.5) : ((this.credits - 2.5) / 2);
            
            } else if (nonZeros == 3) {
                return (this.labSem == "1" || this.labSem == "1ST" || this.labSem == "FIRST") ? ((this.credits - 5) / 2 + 5) : ((this.credits - 2.5) / 2 + 2.5);
            
            } else {
                return this.credits;
            }
        } else {
            return this.credits / (this.credits / 1.25) * nonZeros;
        }
    }
}

