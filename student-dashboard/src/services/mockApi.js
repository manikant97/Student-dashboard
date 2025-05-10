const mockStudents = [
  {
    id: 1,
    name: 'John Doe',
    course: 'Computer Science',
    email: 'john@example.com',
    grade: 'A',
    enrollmentDate: '2024-09-01',
    status: 'Active',
    age: 20,
    phoneNumber: '(555) 123-4567',
    address: '123 University Ave, Silicon Valley, CA',
    semester: 3,
    attendance: 92,
    assignments: [
      { name: 'Project 1', score: 95 },
      { name: 'Mid-term', score: 88 },
      { name: 'Final Project', score: 92 }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    course: 'Mathematics',
    email: 'jane@example.com',
    grade: 'A+',
    enrollmentDate: '2024-09-01',
    status: 'Active',
    age: 19,
    phoneNumber: '(555) 234-5678',
    address: '456 College Blvd, Silicon Valley, CA',
    semester: 3,
    attendance: 98,
    assignments: [
      { name: 'Assignment 1', score: 100 },
      { name: 'Mid-term', score: 96 },
      { name: 'Final Exam', score: 98 }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    course: 'Physics',
    email: 'mike@example.com',
    grade: 'B+',
    enrollmentDate: '2024-08-15',
    status: 'Active',
    age: 21,
    phoneNumber: '(555) 345-6789',
    address: '789 Science Park, Silicon Valley, CA',
    semester: 4,
    attendance: 85,
    assignments: [
      { name: 'Lab Report 1', score: 88 },
      { name: 'Mid-term', score: 85 },
      { name: 'Final Project', score: 90 }
    ]
  },
  {
    id: 4,
    name: 'Sarah Williams',
    course: 'Chemistry',
    email: 'sarah@example.com',
    grade: 'A-',
    enrollmentDate: '2024-09-01',
    status: 'Active',
    age: 20,
    phoneNumber: '(555) 456-7890',
    address: '321 Lab Lane, Silicon Valley, CA',
    semester: 3,
    attendance: 94,
    assignments: [
      { name: 'Lab Report 1', score: 92 },
      { name: 'Mid-term', score: 89 },
      { name: 'Final Exam', score: 91 }
    ]
  },
  {
    id: 5,
    name: 'Alex Brown',
    course: 'Computer Science',
    email: 'alex@example.com',
    grade: 'B',
    enrollmentDate: '2024-08-15',
    status: 'Active',
    age: 22,
    phoneNumber: '(555) 567-8901',
    address: '654 Tech Street, Silicon Valley, CA',
    semester: 4,
    attendance: 88,
    assignments: [
      { name: 'Project 1', score: 85 },
      { name: 'Mid-term', score: 82 },
      { name: 'Final Project', score: 88 }
    ]
  },
  {
    id: 6,
    name: 'Emily Davis',
    course: 'Data Science',
    email: 'emily@example.com',
    grade: 'A',
    enrollmentDate: '2024-09-01',
    status: 'Active',
    age: 21,
    phoneNumber: '(555) 678-9012',
    address: '987 Data Drive, Silicon Valley, CA',
    semester: 3,
    attendance: 96,
    assignments: [
      { name: 'Data Project 1', score: 94 },
      { name: 'Mid-term', score: 92 },
      { name: 'Final Project', score: 95 }
    ]
  },
  {
    id: 7,
    name: 'David Wilson',
    course: 'Mathematics',
    email: 'david@example.com',
    grade: 'A-',
    enrollmentDate: '2024-08-15',
    status: 'Active',
    age: 20,
    phoneNumber: '(555) 789-0123',
    address: '753 Math Court, Silicon Valley, CA',
    semester: 4,
    attendance: 91,
    assignments: [
      { name: 'Assignment 1', score: 88 },
      { name: 'Mid-term', score: 92 },
      { name: 'Final Exam', score: 90 }
    ]
  },
  {
    id: 8,
    name: 'Sophie Chen',
    course: 'Computer Science',
    email: 'sophie@example.com',
    grade: 'A+',
    enrollmentDate: '2024-09-01',
    status: 'Active',
    age: 19,
    phoneNumber: '(555) 890-1234',
    address: '159 Code Avenue, Silicon Valley, CA',
    semester: 3,
    attendance: 97,
    assignments: [
      { name: 'Project 1', score: 98 },
      { name: 'Mid-term', score: 96 },
      { name: 'Final Project', score: 99 }
    ]
  }
];

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all students
export const fetchStudents = async () => {
  await delay(800);
  return [...mockStudents];
};

// Fetch a single student by ID
export const fetchStudentById = async (id) => {
  await delay(500);
  const student = mockStudents.find(s => s.id === id);
  if (!student) {
    throw new Error('Student not found');
  }
  return { ...student };
};

// Add a new student
export const addStudent = async (studentData) => {
  await delay(1000);
  const newStudent = {
    id: mockStudents.length + 1,
    ...studentData,
    status: 'Active',
    enrollmentDate: new Date().toISOString().split('T')[0]
  };
  mockStudents.push(newStudent);
  return { ...newStudent };
};

// Update student
export const updateStudent = async (id, updates) => {
  await delay(1000);
  const index = mockStudents.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Student not found');
  }
  mockStudents[index] = { ...mockStudents[index], ...updates };
  return { ...mockStudents[index] };
};

// Delete student
export const deleteStudent = async (id) => {
  await delay(800);
  const index = mockStudents.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Student not found');
  }
  mockStudents.splice(index, 1);
  return { success: true };
};
