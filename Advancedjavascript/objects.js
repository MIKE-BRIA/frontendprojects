const job = {
  title: "Enterprenuer",
  location: "Miami",
  salary: 1000000,
};

console.log(new Date());

class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }

  describe() {
    console.log(
      `I'm a ${this.title}, I work in ${this.location} and i earn ${this.salary}`
    );
  }
}

const developer = new Job("Developer", "United kingdom", 4672000);
const cook = new Job("Cook", "united States", 56400);

console.log(developer);
console.log(cook);

developer.describe();
cook.describe();
