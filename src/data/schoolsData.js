// src/data/schoolsData.js
import heroImg from "../assets/Hero 1.jpg";
import siteLogo from "../assets/logo.png";

// Raw schools
const rawSchools = [
  { name: "Ado Comm High Schl, Ado Ekiti", address: "Ekute off Omisanjana, Ado", lga: "ADO", established: 1977 },
  { name: "Ado Grammar School, Ado Ekiti", address: "Odo Ado poly Road, Ado Ekiti", lga: "ADO", established: 1960 },
  { name: "All Souls Ang Gram Schl, Ado Ekiti", address: "New Iyin Road", lga: "ADO", established: 2003 },
  { name: "Amure Comm High Schl, Ado Ekiti", address: "Oke-Ila, Ado Ekiti", lga: "ADO", established: 1995 },
  { name: "Ayo Daramola College", address: "Ijero Road, Ado Ekiti", lga: "ADO", established: 1988 },
  { name: "Christ School, Ado Ekiti", address: "Fajuyi Area", lga: "ADO", established: 1933 },
  { name: "Ologede High School", address: "Opopogbooro", lga: "ADO", established: 2008 },
  { name: "Ikere Comm School", address: "Ikere Road", lga: "IKERE", established: 1986 },
  { name: "Ikere High School", address: "Odo Ikere", lga: "IKERE", established: 1993 },
  { name: "Oye High School", address: "Oye Ekiti", lga: "OYE", established: 1990 },
  { name: "Ifaki Grammar School", address: "Ifaki Ekiti", lga: "IFA", established: 1975 },
  { name: "Ilawe High School", address: "Ilawe Ekiti", lga: "ILAWE", established: 1999 },
  { name: "Aramoko Grammar School", address: "Aramoko Ekiti", lga: "ARAMOKO", established: 1982 },
  { name: "Iyin Comm School", address: "Iyin Ekiti", lga: "IYIN", established: 2001 },
  { name: "Efon Grammar School", address: "Efon Alaaye", lga: "EFON", established: 1967 },
  { name: "Ikole Comm High School", address: "Ikole Ekiti", lga: "IKOLE", established: 1981 },
  { name: "Igbara Odo High School", address: "Igbara Odo", lga: "IGBARA", established: 1992 },
  { name: "Odunayo High School", address: "Ado Ikere Road", lga: "ADO", established: 1996 },
  { name: "Ogotun High School", address: "Ogotun Ekiti", lga: "OGOTUN", established: 1984 },
  { name: "Ikoro High School", address: "Ikoro Ekiti", lga: "IKORO", established: 1973 },
];

// Helpers
const courses = ["Mathematics", "English", "Biology", "Chemistry", "Physics", "Computer Science"];
const facilities = ["Science Lab", "Library", "Computer Lab", "Sports Field", "Medical Clinic"];

const schoolsData = rawSchools.map((school, i) => ({
  id: i + 1,
  name: school.name,
  address: school.address,
  location: school.lga,
  lga: school.lga,
  established: school.established,
  img: heroImg,
  logo: siteLogo,
  type: i % 2 === 0 ? "Public" : "Private",
  courses: courses.slice(0, 4),
  facilities: facilities.slice(0, 4),
  fees: `₦${(50 + (i % 10) * 5) * 1000}/term`,
  description: `${school.name} is a well-established school located in ${school.lga}.`,
}));

export default schoolsData;
