function displayProfile() {
    const name = document.getElementById("studentName").value;
    const roll = document.getElementById("rollNumber").value;
    const marks = Number(document.getElementById("marks").value);

    let grade;

    if (marks >= 90) {
        grade = "A+";
    } else if (marks >= 80) {
        grade = "A";
    } else if (marks >= 70) {
        grade = "B";
    } else if (marks >= 60) {
        grade = "C";
    } else if (marks >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    document.getElementById("displayName").textContent = name;
    document.getElementById("displayRoll").textContent = roll;
    document.getElementById("displayMarks").textContent = marks;
    document.getElementById("displayGrade").textContent = grade;
}