// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    let studentNode = new Node(newStudent);
    studentNode.next = null;
    //Case 1: no nodes initially
    if(this.head === null){
      this.head = studentNode
      this.tail = studentNode;
    } else{
    //Case 2: if nodes available, then use tail to find last node and update
      this.tail.next = studentNode;
      this.tail = studentNode;
    }
    this.length += 1;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    let current = this.head;
    let previous;

    while(current != null){
      if(current.data.getEmail() === email){
        if(current === this.head){
          if(current.next != null){
            this.head = current.next;
          }else {
            this.head = null;
            this.tail = null;
          }
        }else if(current === this.tail){
          previous.next = null;
          this.tail = previous;
        }else{
          if(previous === this.head){
            previous.next = current.next;
          } 
        }
        this.length -= 1;
        return;
      }else 
      {
        previous = current;
        current = current.next
      }
    }
    return;
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;
    
    while(current != null){
      if (current.data.getEmail() === email){
        return current.data;
      }
      current = current.next;
    }
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    let current = this.head;

    while(current != null){
      let nextNode = current.next;
      current.next = null;
      current = nextNode;
    }
    this.head = null;
    this.tail = null;
    this.length = 0;
    // TODO
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let current = this.head;
    let output = "";
    while(current != null){
      output += current.data.getName();
      if(current.next != null){
        output += ", ";
      }
      current = current.next;
    }
    return output;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    let current = this.head;
    let studentArray = [];

    while(current != null){
      studentArray.push(current.data);
      current = current.next;
    }
    
    studentArray.sort((a,b) => a.getName() - b.getName());

    return studentArray;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    //implementation using splice method
    // let filteredArray = this.#sortStudentsByName();

    // filteredArray.forEach((student, index) => {
    //   if(student.getSpecialization() != specialization){
    //     filteredArray.splice(index, 1);
    //   }  
    // });

    // return filteredArray;

    //implementation using map, reduce, filter
    let sortedArray = this.#sortStudentsByName();
    const filteredArray = sortedArray.filter(student => student.getSpecialization() === specialization);
    return filteredArray;
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    //implementation using splice method
    // let filteredArray = this.#sortStudentsByName();

    // filteredArray.forEach((student, index) => {
    //   if(student.getYear() < minYear){
    //     filteredArray.splice(index, 1);
    //   }  
    // });

    // return filteredArray;

    //implementation using map, filter, reduce
    let sortedArray = this.#sortStudentsByName();
    const filteredArray = sortedArray.filter(student => student.getYear() >= minYear);
    return filteredArray;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    const fs = require("fs");

    let results = [];

    let current = this.head;

    while(current != null){
      results.push({
        name: current.data.getName(), 
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      });
      current = current.next;
    }

    
    const data = JSON.stringify(results);

    fs.writeFile(fileName, data, (error) => {
      if(error){
        throw error;
      }
    });

  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    const fs = require("fs").promises;
  
    try {
      const data = await fs.readFile(fileName, "utf8"); 
      const results = JSON.parse(data); 
  
      this.clearStudents(); 
  
      results.forEach(studentData => {
        let newStudent = new Student(studentData.name, studentData.year, studentData.email, studentData.specialization);
        this.addStudent(newStudent);
      });
  
    } catch (error) {
      throw error;
    }
  }

}

module.exports = { LinkedList }
