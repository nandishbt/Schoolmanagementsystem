
export const validateEmail = (email) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const ValidatePhone = (phone) =>{
        const regex = /^\d{10}$/
        return regex.test(phone);
}

export const validateDOB = (dob) => {
    const dobRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    
    if (!dobRegex.test(dob)) return { valid: false, message: "Invalid date format (YYYY-MM-DD required)" };
  
    const dobDate = new Date(dob);
    const today = new Date();
    
    if (dobDate >= today) return { valid: false, message: "DOB must be before today" };
  
    return { valid: true, message: "Valid DOB" };
  };

 export const validateSchoolYear = (year) => {
    const yearRegex = /^(19|20)\d{2}-(19|20)\d{2}$/;
  
    if (!yearRegex.test(year)) {
      return { valid: false, message: "Invalid format! Use YYYY-YYYY." };
    }
  
    const [startYear, endYear] = year.split("-").map(Number);
    const currentYear = new Date().getFullYear();
  
    if (endYear !== startYear + 1) {
      return { valid: false, message: "End year must be exactly one year after start year." };
    }
  
    if (startYear > currentYear) {
      return { valid: false, message: "Start year cannot be in the future." };
    }
  
    return { valid: true, message: "Valid school year." };
  };


